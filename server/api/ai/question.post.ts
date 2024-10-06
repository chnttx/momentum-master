import { generateQuestions } from "~/server/services/reflection";

/**
 * Post endpoint to get a question based on the user's response.
 * Body should be json in the format:
 * {
 *     "userResponse": str,
 *     "questionsAsked": [Number]
 * }
 */
export default defineEventHandler(async (event) => {
    try {
        const { userResponse, questionsAsked } = await readBody(event);
        return await generateQuestions(userResponse, new Set(questionsAsked));
    } catch (err) {
        console.error(err);
        setResponseStatus(event, 400);
    }
});
