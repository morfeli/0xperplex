import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response = streamText({
      model: openai("gpt-4"),
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Generate 10 topic suggestions about ${topic}. Generate them as questions such as What is a black hole? What is a worm hole? Does time exisit in space? Etc. Do not list the suggestions with numbers. Make sure to generate new topics whenever this api call is executed. Generate them with a line break if the text is too long`,
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

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
