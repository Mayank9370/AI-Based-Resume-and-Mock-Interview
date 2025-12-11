import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const enhanceText = async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: "Text is required" });
        }

        console.log(`[Gemini] Enhancing text of type: ${type}`);

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest"
        });

        let prompt = "";

        if (type === "experience") {
            prompt = `Rewrite the following resume experience description to be more professional, impactful, and ATS-friendly.
• Use bullet points.
• Start with action verbs.
• Include measurable results.

Original:
"${text}"`;
        } else if (type === "summary") {
            prompt = `Rewrite the following resume summary to be concise, professional, and ATS-optimized.
Keep under 4 sentences.

Original:
"${text}"`;
        } else {
            prompt = `Enhance this resume text to be formal and impactful.

Original:
"${text}"`;
        }

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        });

        const enhancedText = result.response.text().trim();

        res.json({ success: true, enhancedText });

    } catch (error) {
        console.error("Gemini Enhancement Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to enhance text with Gemini",
            error: error.message
        });
    }
};
