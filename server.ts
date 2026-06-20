import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy-loaded GenAI client to prevent crashing on startup without API Key
let genAIInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is not configured. Please add it in the Secrets panel.",
      );
    }
    genAIInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIInstance;
}

const app = express();
const PORT = 3500;

app.use(express.json());

// API: Word lookup - queries Gemini to fetch dictionary details of any Arbitrary English Word
app.post("/api/gemini/lookup", async (req, res) => {
  try {
    const { word } = req.body;
    if (!word || typeof word !== "string") {
      res.status(400).json({ error: "Invalid word requested" });
      return;
    }

    const ai = getGenAI();
    const systemPrompt = `You are a professional dictionary database engine for Thai English-language learners.
Given an English word, look up its definitions, phonetic spelling, word class, and generate high quality Thai translation and contextual examples.
Provide your response strictly as a JSON object matching this structure:
{
  "word": "exactly the requested word with proper capitalization",
  "wordClass": "Noun | Verb | Adjective | Adverb | Preposition | Conjunction",
  "phonetic": "phonetic symbol like /əˈbʌndənt/",
  "translation": "Thai meaning in 1-4 short terms",
  "definitionEn": "accurate brief English definition",
  "definitionTh": "accurate brief Thai translation of the definition",
  "exampleEn": "A clear, natural example sentence in English",
  "exampleTh": "Excellent Thai translation of the example sentence",
  "difficulty": "Beginner | Intermediate | Advanced",
  "category": "Daily Life | Business | Travel | Academic | Technology | Emotion",
  "mnemonic": {
    "story": "A creative, memorable mnemonic helper story in Thai to help Thai speakers easily remember this word's spelling and meaning (e.g. associating sound or similar words)",
    "keyword": "Main trigger key sound or keyword in Thai"
  }
}
Return ONLY valid JSON and absolutely nothing else. Do not wrap in markdown block code tags.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Look up word: "${word}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "word",
            "wordClass",
            "phonetic",
            "translation",
            "definitionEn",
            "definitionTh",
            "exampleEn",
            "exampleTh",
            "difficulty",
            "category",
            "mnemonic",
          ],
          properties: {
            word: { type: Type.STRING },
            wordClass: { type: Type.STRING },
            phonetic: { type: Type.STRING },
            translation: { type: Type.STRING },
            definitionEn: { type: Type.STRING },
            definitionTh: { type: Type.STRING },
            exampleEn: { type: Type.STRING },
            exampleTh: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            category: { type: Type.STRING },
            mnemonic: {
              type: Type.OBJECT,
              required: ["story", "keyword"],
              properties: {
                story: { type: Type.STRING },
                keyword: { type: Type.STRING },
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const dictResult = JSON.parse(text);
    // Assure word has a random ID or is based on the word
    dictResult.id =
      "custom_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    res.json(dictResult);
  } catch (error: any) {
    console.error("Lookup error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve dictionary data" });
  }
});

// API: Custom Thai Mnemonic Generator for any word
app.post("/api/gemini/mnemonic", async (req, res) => {
  try {
    const { word, translation, wordClass } = req.body;
    if (!word || !translation) {
      res.status(400).json({ error: "Missing word or translation parameters" });
      return;
    }

    const ai = getGenAI();
    const prompt = `Calculate a mnemonic sound association or memory tip in THAI for English word: "${word}" (${wordClass || "word"}), meaning "${translation}".
Create a funny, memorable word association that is super easy for Thai school students to remember.
Format the output as a JSON with these fields:
- keyword: short association keyword or sound association
- story: the full catchy funny mnemonics story in Thai.
Example: for "Jeopardy" (อันตราย) -> keyword: เจ็บพอดี, story: "เดินซุ่มซ่ามตกหน้าผากระแทก 'เจ็บพอดี' เพราะไปเล่นที่ 'อันตราย'"

Return only JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["keyword", "story"],
          properties: {
            keyword: { type: Type.STRING },
            story: { type: Type.STRING },
          },
        },
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Mnemonic generation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: Interactive Tutoring Chat with an AI English Coach (Coach Max)
// TalkTo style interactive chat that helps you practice conversational English,
// corrects grammatical errors, explains terms, and suggests phrases dynamically.
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, targetWords } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    const ai = getGenAI();
    const systemPromptMessage = `You are "Coach Max", a friendly, empathetic, and encouraging AI English Speaking Coach inspired by Duolingo and specialized language tutoring apps.
Your goals:
1. Conduct safe, lively, English chat practice with Thai people.
2. Communicate mostly in Simple English, but provide clear Thai explanations in brackets (for grammar corrections or word definitions) to support understanding!
3. If the user makes an English grammatical mistake, gently point it out, explain why (in Thai), and give the correct way to say it in English.
4. Try to encourage the user to use active vocabulary words: ${targetWords && targetWords.length > 0 ? targetWords.join(", ") : "general daily vocabularies"}.
5. Give 2-3 short, helpful 'Suggested Phrases' or 'Quick Answers' (1 English phrase + Thai translation in brackets) that the user can click to answer you.

Provide your response strictly as a JSON object matching this schema:
{
  "text": "Your friendly English message with optional Thai guidance in parentheses",
  "suggestedPhrases": ["Short response option 1 (Thai translation)", "Short response option 2 (Thai translation)"]
}`;

    // Map message history to standard format
    const geminiHistory = messages.map((m) => {
      // If role is model, map to 'model', else 'user'
      // Gemini expects text in parts array
      return {
        role: m.role,
        parts: [
          {
            text: typeof m.text === "string" ? m.text : JSON.stringify(m.text),
          },
        ],
      };
    });

    // We can run generative text
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Initial context for the teacher: User wants to conversationalize. System prompt rules: ${systemPromptMessage}`,
            },
          ],
        },
        ...geminiHistory,
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["text", "suggestedPhrases"],
          properties: {
            text: { type: Type.STRING },
            suggestedPhrases: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const parsedResponse = JSON.parse(response.text || "{}");
    res.json(parsedResponse);
  } catch (error: any) {
    console.error("Chat error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate tutor reply" });
  }
});

// API: Generate unique, contextual quiz questions based on selected vocabulary words
app.post("/api/gemini/quiz-gen", async (req, res) => {
  try {
    const { wordObj } = req.body;
    if (!wordObj) {
      res.status(400).json({ error: "word object is required" });
      return;
    }

    const ai = getGenAI();
    const prompt = `Generate an engaging interactive Quiz Question for the English word: "${wordObj.word}" (translation: "${wordObj.translation}", class: "${wordObj.wordClass}").
Create one of three types randomly:
1. "multiple-choice" (fill-in-the-blank sentence where options contain correct word or distractors)
2. "definition-match" (read a Thai scenario or detailed explanation and choose the English word matching it)
3. "spelling" (arrange letters, provide a clue, or write the missing parts)

You must output a highly polished JSON structure matching:
{
  "id": "quiz_gen_id",
  "type": "multiple-choice | spelling | definition-match",
  "questionText": "The question title or description in Thai with English sentence. E.g. 'เติมคำในช่องว่าง: She has an ____ supply of food for winter. (เธอมีอาหารเยอะแยะเพียงพอสำหรับฤดูหนาว)'",
  "options": ["wordA", "wordB", "wordC", "wordD"], // Must be exactly 4 unique choices if multiple-choice or definition-match. If spelling, can be letters to unscramble.
  "correctAnswer": "The exact correct string option",
  "hint": "A gentle helpful hint in Thai"
}

Ensure the distractors in options are highly plausible words of the same class! Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "type",
            "questionText",
            "options",
            "correctAnswer",
            "hint",
          ],
          properties: {
            type: { type: Type.STRING },
            questionText: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctAnswer: { type: Type.STRING },
            hint: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    parsed.id = "q_" + Date.now();
    res.json(parsed);
  } catch (error: any) {
    console.error("Quiz gen error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend assets using Vite middleware or static directory
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
    console.log(`English Vocabulary Learner server booted on port ${PORT}`);
  });
}

startServer();
