import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "Say hello!" }],
            model: "gpt-3.5-turbo",
        });

        console.log("OpenAI Verification Success: ", completion.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI Verification Failed:", error);
    }
}

main();
