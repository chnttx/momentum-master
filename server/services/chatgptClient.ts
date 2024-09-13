import OpenAI from "openai";

export const openAIClient = new OpenAI({
    project: process.env.CHATGPT_PROJECT_ID,
    organization: process.env.CHATGPT_ORGANISATION_ID,
    apiKey: process.env.CHATGPT_SECRET_KEY
});

export const queryChatGPT = async ({ systemQuery, userQuery }: { systemQuery: string, userQuery: string}) => {

    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": systemQuery
            },
            {
                "role": "user",
                "content": userQuery
            }

        ]
    })

    const message = response.choices[0].message.content

    return { message }
}