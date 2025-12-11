import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extract structured resume data from raw text using Gemini AI
 * @param {string} text - Raw text extracted from resume
 * @returns {Promise<Object>} - Structured resume data matching our Resume model
 */
export const extractResumeData = async (text) => {
    try {
        console.log("[Gemini] Extracting and enhancing resume data...");

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest"
        });

        const prompt = `You are an expert resume parser and ATS (Applicant Tracking System) optimizer. 
        
Parse the following resume text and extract structured data. Also enhance the content to make it more professional and ATS-friendly.

**Instructions:**
1. Extract ALL information into the JSON structure below
2. For experience descriptions: Use strong action verbs, quantify achievements where possible, make them ATS-friendly
3. For summary: Create a concise, impactful professional summary (2-3 sentences)
4. For skills: Extract both technical and soft skills
5. Preserve all dates, company names, and education details accurately
6. Extract custom sections like Certifications, Languages, Awards, Publications, Achievements, Volunteering, etc.
7. If any field is not found, use empty string "" or empty array []
8. For custom sections that don't fit standard types, use type "custom" with a descriptive title

**Output a valid JSON object with this exact structure:**

{
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "professional_summary": "",
  "sections": [
    {
      "id": "exp-1",
      "type": "experience",
      "title": "Work Experience",
      "order": 1,
      "data": [
        {
          "company": "",
          "position": "",
          "start_date": "YYYY-MM",
          "end_date": "YYYY-MM",
          "is_current": false,
          "description": ["Bullet point 1", "Bullet point 2"]
        }
      ]
    },
    {
      "id": "edu-1",
      "type": "education",
      "title": "Education",
      "order": 2,
      "data": [
        {
          "institution": "",
          "degree": "",
          "field": "",
          "graduation_date": "YYYY"
        }
      ]
    },
    {
      "id": "skills-1",
      "type": "skills",
      "title": "Skills",
      "order": 3,
      "data": ["skill1", "skill2", "skill3"]
    },
    {
      "id": "projects-1",
      "type": "project",
      "title": "Projects",
      "order": 4,
      "data": [
        {
          "name": "",
          "tech": "tech1, tech2",
          "role": "",
          "description": ["Bullet point 1", "Bullet point 2"],
          "link": ""
        }
      ]
    },
    {
      "id": "cert-1",
      "type": "custom",
      "title": "Certifications",
      "order": 5,
      "data": [
        {
          "title": "Certificate Name",
          "subtitle": "Issuer Name",
          "description": ["Details about certification"],
          "date": "YYYY"
        }
      ]
    },
    {
      "id": "lang-1",
      "type": "custom",
      "title": "Languages",
      "order": 6,
      "data": [
        {
          "title": "Language Name",
          "subtitle": "Proficiency Level",
          "description": []
        }
      ]
    }
  ]
}

**IMPORTANT RULES:** 
- Return ONLY valid JSON, no markdown formatting, no code blocks
- Only include sections that have data found in the resume
- Order sections logically: Experience, Education, Skills, Projects, then any custom sections
- For certifications, languages, awards, achievements, publications, volunteering - use type "custom" with the appropriate title
- For experience and project descriptions, use arrays of bullet points
- Enhance all descriptions to be professional and ATS-optimized
- Generate unique IDs for each section (exp-1, edu-1, skills-1, projects-1, cert-1, lang-1, etc.)

**Resume Text:**
${text}`;

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        });

        let responseText = result.response.text().trim();

        // Remove markdown code blocks if present
        responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "");

        const parsedData = JSON.parse(responseText);

        console.log("[Gemini] Successfully extracted resume data");
        return parsedData;

    } catch (error) {
        console.error("Gemini Resume Extraction Error:", error);
        throw new Error(`Failed to extract resume data: ${error.message}`);
    }
};
