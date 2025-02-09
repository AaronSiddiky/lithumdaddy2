import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getSystemPrompt = (bookTitle: string) => {
  if (
    bookTitle.includes("Ibn Arabi") ||
    bookTitle.includes("Translator of Desires")
  ) {
    return `You are a knowledgeable scholar specializing in Ibn Arabi's works, particularly The Translator of Desires (Tarjuman al-Ashwaq).
    You understand:
    - The mystical and spiritual dimensions of Ibn Arabi's poetry
    - The concept of divine love in Sufi tradition
    - The historical context of 12th-13th century Islamic mysticism
    - The metaphorical language and symbolism in Ibn Arabi's work
    - The relationship between human and divine love in his poetry
    
    Provide thoughtful, nuanced answers about the poems, their meanings, and their spiritual significance.
    When discussing specific verses, explain both their literal and mystical interpretations.
    Keep responses clear and accessible while maintaining scholarly depth.`;
  }

  return `You are a knowledgeable assistant who specializes in discussing the book "${bookTitle}". 
  Provide insightful answers about the book's themes, characters, plot, and historical context. 
  If asked about specific quotes or passages, analyze them thoughtfully.
  Keep responses concise but informative.`;
};

export async function POST(request: Request) {
  try {
    const { messages, bookTitle } = await request.json();

    const systemMessage = {
      role: "system",
      content: getSystemPrompt(bookTitle),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process the chat request" },
      { status: 500 }
    );
  }
}
