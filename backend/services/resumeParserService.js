import { createRequire } from "module";
import axios from "axios";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Parse resume file to extract text content
 * @param {Object} file - Multer file object with path (Cloudinary URL or local path)
 * @returns {Promise<string>} - Extracted text from the resume
 */
export const parseResumeFile = async (file) => {
    try {
        const { path, mimetype } = file;

        // Fetch file buffer from Cloudinary URL
        const response = await axios.get(path, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data);

        let extractedText = "";

        if (mimetype === "application/pdf") {
            // Parse PDF
            const pdfData = await pdfParse(buffer);
            extractedText = pdfData.text;
        } else if (
            mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            mimetype === "application/msword"
        ) {
            // Parse DOCX
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        } else {
            throw new Error("Unsupported file type");
        }

        // Clean up the text (remove excessive whitespace, etc.)
        extractedText = extractedText
            .replace(/\s+/g, " ")
            .replace(/\n\s*\n/g, "\n")
            .trim();

        return extractedText;
    } catch (error) {
        console.error("Resume parsing error:", error);
        throw new Error(`Failed to parse resume: ${error.message}`);
    }
};
