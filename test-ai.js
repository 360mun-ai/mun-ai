const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

// Load .env.local
dotenv.config({ path: path.join(__dirname, ".env.local") });

async function testGemini() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("❌ ERROR: No GOOGLE_GENERATIVE_AI_API_KEY found in .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.0-pro"];

  console.log("🚀 STARTING AI DIAGNOSTICS...");
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`
🔍 TESTING MODEL: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say 'AI is online' if you can read this.");
      const response = await result.response;
      console.log(`✅ SUCCESS [${modelName}]: ${response.text()}`);
      return; // Stop after first success
    } catch (e) {
      console.error(`❌ FAILED [${modelName}]: ${e.message}`);
    }
  }

  console.log("
❌ ALL MODELS FAILED. Your API key might be restricted or inactive.");
}

testGemini();
