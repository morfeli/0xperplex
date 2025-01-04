import { openai } from "@ai-sdk/openai";
import { embed, streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

// Validate environment variables
if (
  !ASTRA_DB_NAMESPACE ||
  !ASTRA_DB_COLLECTION ||
  !ASTRA_DB_API_ENDPOINT ||
  !ASTRA_DB_APPLICATION_TOKEN ||
  !OPENAI_API_KEY
) {
  throw new Error("Missing required environment variables");
}

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    if (!latestMessage) {
      return new Response("No message content provided", { status: 400 });
    }

    let docContext = "";

    try {
      // Generate embedding using the AI SDK
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: latestMessage,
      });

      const collection = db.collection(ASTRA_DB_COLLECTION);

      const cursor = collection.find(null, {
        sort: {
          $vector: embedding,
        },
        limit: 10,
      });

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.error("Error generating embedding or querying db:", err);
      docContext = "No relevant context found.";
    }

    const template = {
      role: "system",
      content: `
        You are an AI assistant specializing in everything related to outer space, including topics like the universe, time, galaxies, stars, planets, the sun, the cosmos, and more. Your primary role is to assist in building a Retrieval-Augmented Generation (RAG) space-focused answer engine.
        Use the provided context, which includes information scraped from Wikipedia and NASA's official website, to answer questions whenever available.
        If the context provides answers, include at least 5 sources formatted in a clear, numbered list.
        If the context does not provide relevant information, rely on your extensive existing knowledge to craft accurate and thoughtful responses.
        Avoid citing sources when relying solely on existing knowledge.
        Use Markdown formatting for better readability. Whenever possible, include at least 3 images relevant to the topic being discussed to enhance the user's understanding.
        If asked about "Black Holes," you might describe their formation, properties, and scientific significance.
        Provide accompanying context-based sources (if available).
        Include illustrative images like simulations of black holes, the Event Horizon Telescope image, or infographics.
        Be engaging, concise, and informative. Tailor your explanations to ensure accessibility for both enthusiasts and professionals in the field of space science. With this framework, you aim to deliver an immersive and visually rich learning experience about the wonders of space.
        -------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ------------
        QUESTION: ${latestMessage}
        ------------
      `,
    };

    const stream = streamText({
      model: openai("gpt-4"),
      messages: [template, ...messages],
    });

    return stream.toDataStreamResponse();
  } catch (err) {
    console.error("Error in POST handler:", err);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
