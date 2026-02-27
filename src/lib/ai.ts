'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

function getAI() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenerativeAI(apiKey);
}

// Internal function to try multiple models in a row
async function generateWithFallback(prompt: string) {
  const genAI = getAI();
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.0-pro"];
  let lastError = "";

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting generation with model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.warn(`Model ${modelName} failed:`, error.message);
      lastError = error.message;
      continue; // Try the next model
    }
  }

  throw new Error(`All models failed. Last error: ${lastError}`);
}

export async function generateSpeechAction(country: string, topic: string, vibe: string) {
  try {
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
    `;

    return await generateWithFallback(prompt);
  } catch (error: any) {
    console.error("AI Speech Error:", error);
    if (error.message === "MISSING_API_KEY") {
      return "ERROR: The API Key is not found in the server environment. Please check Vercel Settings.";
    }
    return `AI Error: ${error.message || "Unknown error occurred."}`;
  }
}

export async function researchDeliberationAction(query: string, context?: string) {
  try {
    const prompt = `
      You are the "Best Delegate" MUN Research Assistant.
      Analyze the following query based on the provided document context.
      
      Query: ${query}
      ${context ? `Context: ${context.substring(0, 10000)}` : ""}
      
      Provide a strategic summary and a Diplomatic Pro-Tip.
    `;

    return await generateWithFallback(prompt);
  } catch (error: any) {
    console.error("AI Research Error:", error);
    return `AI Error: ${error.message || "Unknown error."}`;
  }
}
