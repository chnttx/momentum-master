import {getAllQuestions} from "~/server/services/reflection";

/**
 * GET endpoint to retrieve all questions
 */
export default defineEventHandler(async (event) => {
    try {
        return await getAllQuestions()
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
    }
})