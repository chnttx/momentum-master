import { generateQuestions } from "~/server/services/reflection";

/**
 * Post endpoint to get a question based on the user's initial response
 */
export default defineEventHandler(async (event) => {
    try {
        const { userResponse } = await readBody(event);
        return await generateQuestions(userResponse);
    } catch (err) {
        console.error(err);
        setResponseStatus(event, 400);
    }
});
