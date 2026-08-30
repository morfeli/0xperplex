// Seed script for 0xperplex — scrapes space content from Wikipedia + NASA,
// embeds it with OpenAI text-embedding-3-small, and loads it into AstraDB.
//
// Usage:
//   node scripts/seed.mjs --dry-run   # scrape + chunk only, no OpenAI/Astra calls
//   node scripts/seed.mjs             # full run: creates collection if needed, embeds, inserts
import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import OpenAI from "openai";

const DRY_RUN = process.argv.includes("--dry-run");

const WIKIPEDIA_TOPICS = [
  "Universe", "Big Bang", "Galaxy", "Milky Way", "Black hole", "Neutron star",
  "Supernova", "Star", "Sun", "Solar System", "Mercury (planet)", "Venus",
  "Earth", "Moon", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune",
  "Exoplanet", "Asteroid", "Comet", "Nebula", "Dark matter", "Dark energy",
  "Cosmic microwave background", "General relativity", "Speed of light",
  "Light-year", "Spacetime", "Gravitational wave", "Event Horizon Telescope",
  "James Webb Space Telescope", "Hubble Space Telescope",
  "International Space Station", "Apollo 11", "Artemis program",
  "SpaceX", "Voyager 1", "Mars rover", "Astrobiology", "Fermi paradox",
  "Drake equation", "Kuiper belt", "Oort cloud", "Pulsar", "Quasar",
  "Red giant", "White dwarf", "Interstellar medium",
];

const NASA_PAGES = [
  "https://science.nasa.gov/universe/black-holes/",
  "https://science.nasa.gov/universe/galaxies/",
  "https://science.nasa.gov/universe/stars/",
  "https://science.nasa.gov/exoplanets/",
  "https://science.nasa.gov/solar-system/",
  "https://science.nasa.gov/sun/",
  "https://science.nasa.gov/moon/",
  "https://science.nasa.gov/mars/",
  "https://science.nasa.gov/mission/webb/",
  "https://science.nasa.gov/mission/hubble/",
];

const CHUNK_SIZE = 1200;   // chars
const CHUNK_OVERLAP = 200; // chars
const EMBED_MODEL = "text-embedding-3-small"; // 1536 dims
const EMBED_BATCH = 100;

// ---------- scraping ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWikipedia(title, attempt = 1) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&format=json&redirects=1&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": "0xperplex-seed/1.0" } });
  if (res.status === 429 && attempt <= 3) {
    await sleep(5000 * attempt);
    return fetchWikipedia(title, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  if (!page?.extract) throw new Error("no extract");
  return {
    source: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
    title: page.title,
    text: page.extract,
  };
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;|&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchNasa(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (0xperplex-seed)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = htmlToText(await res.text());
  if (text.length < 500) throw new Error("page too thin after stripping");
  return { source: url, title: url, text };
}

// ---------- chunking ----------
function chunk(text) {
  const chunks = [];
  const paragraphs = text.split(/\n{2,}/);
  let current = "";
  for (const p of paragraphs) {
    if ((current + "\n\n" + p).length > CHUNK_SIZE && current) {
      chunks.push(current.trim());
      current = current.slice(-CHUNK_OVERLAP) + "\n\n" + p;
    } else {
      current = current ? current + "\n\n" + p : p;
    }
  }
  if (current.trim().length > 100) chunks.push(current.trim());
  // hard-split any chunk that's still oversized (single huge paragraph)
  return chunks.flatMap((c) => {
    if (c.length <= CHUNK_SIZE * 1.5) return [c];
    const out = [];
    for (let i = 0; i < c.length; i += CHUNK_SIZE - CHUNK_OVERLAP) out.push(c.slice(i, i + CHUNK_SIZE));
    return out;
  });
}

// ---------- main ----------
const docs = [];
for (const topic of WIKIPEDIA_TOPICS) {
  try {
    const page = await fetchWikipedia(topic);
    const pieces = chunk(page.text);
    for (const text of pieces) docs.push({ text: `${text}\n\nSource: ${page.source}`, source: page.source, title: page.title });
    console.log(`wiki  ok  ${topic} -> ${pieces.length} chunks`);
  } catch (e) {
    console.log(`wiki  FAIL ${topic}: ${e.message}`);
  }
  await sleep(600); // stay under Wikipedia rate limits
}
for (const url of NASA_PAGES) {
  try {
    const page = await fetchNasa(url);
    const pieces = chunk(page.text);
    for (const text of pieces) docs.push({ text: `${text}\n\nSource: ${page.source}`, source: page.source, title: page.title });
    console.log(`nasa  ok  ${url} -> ${pieces.length} chunks`);
  } catch (e) {
    console.log(`nasa  FAIL ${url}: ${e.message}`);
  }
}
console.log(`\nTotal chunks: ${docs.length}`);
const totalChars = docs.reduce((s, d) => s + d.text.length, 0);
console.log(`Total chars: ${totalChars} (~${Math.round(totalChars / 4)} tokens, ~$${((totalChars / 4 / 1e6) * 0.02).toFixed(4)} embedding cost)`);

if (DRY_RUN) {
  console.log("\nDry run — stopping before embedding/insert.");
  process.exit(0);
}

const { ASTRA_DB_NAMESPACE, ASTRA_DB_COLLECTION, ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, OPENAI_API_KEY } = process.env;
if (!ASTRA_DB_NAMESPACE || !ASTRA_DB_COLLECTION || !ASTRA_DB_API_ENDPOINT || !ASTRA_DB_APPLICATION_TOKEN || !OPENAI_API_KEY) {
  console.error("Missing required env vars (ASTRA_DB_* / OPENAI_API_KEY)");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

console.log(`\nEnsuring collection '${ASTRA_DB_COLLECTION}' (1536 dims, cosine)…`);
try {
  await db.createCollection(ASTRA_DB_COLLECTION, { vector: { dimension: 1536, metric: "cosine" } });
  console.log("collection created");
} catch (e) {
  if (/already exists/i.test(e.message)) console.log("collection already exists");
  else throw e;
}
const collection = db.collection(ASTRA_DB_COLLECTION);

let inserted = 0;
for (let i = 0; i < docs.length; i += EMBED_BATCH) {
  const batch = docs.slice(i, i + EMBED_BATCH);
  const emb = await openai.embeddings.create({ model: EMBED_MODEL, input: batch.map((d) => d.text) });
  const rows = batch.map((d, j) => ({ text: d.text, source: d.source, title: d.title, $vector: emb.data[j].embedding }));
  await collection.insertMany(rows);
  inserted += rows.length;
  console.log(`inserted ${inserted}/${docs.length}`);
}
console.log("\nDone ✅");
