import OpenAI from "openai";

export const openAIClient = new OpenAI({
    project: process.env.CHATGPT_PROJECT_ID,
    organization: process.env.CHATGPT_ORGANISATION_ID,
    apiKey: process.env.CHATGPT_SECRET_KEY
});
