import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/fertilizer", async (req, res) => {
  try {
    const { crop, soil, nitrogen, phosphorus, potassium } = req.body;
    const prompt = `
      You are Krishi Astra AI Fertilizer Expert.
      Recommend the best fertilizers and dosages for:
      - Crop: ${crop}
      - Soil Type: ${soil}
      - Nutrients (N-P-K): ${nitrogen}-${phosphorus}-${potassium}
      Give concise, farmer-friendly advice.
    `;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    res.json({ recommendation: result.response.text() });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
