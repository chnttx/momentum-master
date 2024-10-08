import { generateQuestions } from "~/server/services/reflection";
import {chatGPTError} from "~/server/error/chatGPTError";

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
        const { userResponse, questionsAsked, skillFocus } = await readBody(event);
        return await generateQuestions(userResponse, new Set(questionsAsked), skillFocus);
    } catch (err) {
        console.error(err)
        if (err instanceof chatGPTError) {
            setResponseStatus(event, err.status)
            return
        }
        setResponseStatus(event, 400)

    }
});
