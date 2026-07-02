import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
// We use process.env.GEMINI_API_KEY which is injected automatically in AI Studio
const apiKey = process.env.GEMINI_API_KEY || "dummy_key";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chat session route for the LuMay AI Voice Agent interactive simulation
app.post("/api/agent/chat", async (req, res) => {
  const { messages, industry, useCase, voiceName, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const formattedMessages = messages.map((m) => `${m.role === "user" ? "Customer" : "AI Agent"}: ${m.content}`).join("\n");

    const systemInstruction = `
      You are LuMay's advanced AI Voice Agent simulating a live phone call.
      Your voice profile is "${voiceName}", speaking fluent "${language}".
      You are serving the "${industry}" industry, specifically handling the "${useCase}" use case.

      CONVERSATIONAL GUIDELINES FOR PHONE CALLS:
      1. Keep your response extremely brief, human-like, and conversational (1 to 2 short sentences max).
      2. Speak as if you are on a real-time voice call. Avoid lists, markdown formatting, bullet points, and robotic expressions.
      3. Use conversational fillers naturally like "Aha", "Sure", "Let me see", or "Got it" occasionally, but stay highly professional.
      4. If the usecase is Inbound Appointment Booking or Outbound Qualification: guide the customer gently to provide their name, interest, or desired slot, then acknowledge warmly.
      5. Do not prefix your answer with "AI Agent:" or "Response:". Just output the direct speech.
    `;

    const prompt = `
      The conversation transcript so far:
      ${formattedMessages}

      Generate the next short phone response from the AI Voice Agent:
    `;

    // We use gemini-3.5-flash as it is the default for basic text and highly responsive
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 150,
      },
    });

    res.json({ text: response.text?.trim() || "Aha, perfect. How can I help you further?" });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: "Failed to generate response", details: error.message });
  }
});

// Analytics compilation route after call simulation ends
app.post("/api/agent/analyze", async (req, res) => {
  const { messages, industry, useCase } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages to analyze" });
  }

  try {
    const formattedMessages = messages.map((m) => `${m.role === "user" ? "Customer" : "AI Agent"}: ${m.content}`).join("\n");

    const prompt = `
      Analyze this phone conversation transcript between a Customer and LuMay's AI Voice Agent in the "${industry}" industry (handling "${useCase}"):
      
      ${formattedMessages}
    `;

    const schema = {
      type: Type.OBJECT,
      properties: {
        sentiment: { type: Type.STRING, description: "Must be exactly one of: Positive, Neutral, Negative" },
        sentimentScore: { type: Type.INTEGER, description: "A percentage score from 0 to 100" },
        leadScore: { type: Type.INTEGER, description: "A percentage score from 0 to 100 based on buyer intent or helpfulness" },
        qualificationStatus: { type: Type.STRING, description: "Must be exactly one of: Qualified, Follow-up Required, Not Qualified" },
        summary: { type: Type.STRING, description: "A concise 2-sentence summary of what the customer wanted and the final result" },
        actionItems: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of 2-3 specific next actions for the CRM or team (e.g. 'Schedule appointment for dental clean', 'Email price brochure')"
        },
        bookedAppointment: { type: Type.BOOLEAN, description: "True if an appointment was booked, contact info was saved, or a demo was scheduled" }
      },
      required: ["sentiment", "sentimentScore", "leadScore", "qualificationStatus", "summary", "actionItems", "bookedAppointment"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2,
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Analyze API Error:", error);
    // Fallback static analysis if key fails or rate limit hit
    res.json({
      sentiment: "Positive",
      sentimentScore: 85,
      leadScore: 78,
      qualificationStatus: "Qualified",
      summary: "Customer interacted with the simulated voice receptionist. They explored options and completed the quick setup.",
      actionItems: [
        "Follow up via LuMay dashboard notification",
        "Offer 5 extra free trial calling minutes"
      ],
      bookedAppointment: true,
      isFallback: true
    });
  }
});

// Configure Vite middleware in development or static hosting in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
