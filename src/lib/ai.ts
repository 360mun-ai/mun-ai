'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

function getAI() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  // No explicit version here, the SDK handles it
  return new GoogleGenerativeAI(apiKey);
}

export async function generateSpeechAction(country: string, topic: string, vibe: string) {
  try {
    const genAI = getAI();
    // This is the most stable ID in 2026
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Model United Nations strategist and speechwriter.
      Write a formal opening statement for the delegate of ${country}.
      The committee topic is: ${topic}.
      The tone of the speech should be ${vibe}.
      
      Requirements:
      1. Start with "Honorable Chair, Distinguished Delegates".
      2. Use formal UN diplomatic language.
      3. Include a specific policy stance or call to action.
      4. Keep it under 150 words (suitable for a 1-minute speech).
      5. Do not use placeholders like [insert data]; make it sound complete.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("AI Speech Error:", error);
    if (error.message.includes("404")) {
      return "AI Error 404: The model name 'gemini-1.5-flash' was not found for your API key. Please check if your key is from Google AI Studio and is activated.";
    }
    return `AI Error: ${error.message || "Unknown error."}`;
  }
}

export async function researchDeliberationAction(query: string, context?: string) {
  try {
    const genAI = getAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are the "Best Delegate" MUN Research Assistant.
      Analyze the following query based on the provided document context.
      
      Query: ${query}
      
      Document Context: 
      ${context ? context.substring(0, 30000) : "No specific document provided. Use your general UN knowledge."}
      
      Provide:
      1. A strategic summary of how this document relates to the query.
      2. Specific quotes or clauses (if context provided) to use in debate.
      3. A "Diplomatic Pro-Tip" for using this information to sway the committee.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("AI Research Error:", error);
    return `AI Error: ${error.message || "Unknown error."}`;
  }
}
