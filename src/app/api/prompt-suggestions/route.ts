import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const response = streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. Generate 10 topic suggestions about ${topic}. Generate them as questions such as What is a black hole? What is a worm hole? Does time exisit in space? Etc. Do not list the suggestions with numbers. Generate them with a line break if the text is too long`,
      },
    ],
  });

  let fullResponse = "";
  for await (const chunk of response.textStream) {
    fullResponse += chunk;
  }

  const suggestions = fullResponse
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(0, 10);

  if (suggestions) {
    return NextResponse.json({ suggestions });
  } else {
    const fallbackSuggestions = [
      "How did the first stars and galaxies form after the Big Bang?",
      "What evidence supports the theory of cosmic inflation?",
      "Can you explain the physics inside a supermassive black hole's event horizon?",
      "How do black holes potentially connect to other dimensions or universes?",
      "What are the most promising exoplanets that could potentially harbor life?",
      "What biochemical conditions are necessary for life to emerge beyond Earth?",
      "How do neutron star collisions contribute to creating heavy elements in the universe?",
      "What would happen if two galaxies completely merged?",
      "What technological breakthroughs are needed to enable human interstellar travel?",
      "Describe the most realistic scenarios for establishing a permanent human colony on Mars.",
    ];

    return NextResponse.json({ suggestions: fallbackSuggestions });
  }
}
