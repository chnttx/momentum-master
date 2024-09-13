import {generateQuestions} from "~/server/services/reflection";

/**
 * Post endpoint to get a question based on the user's initial response
 */
export default defineEventHandler(async (event) => {
    const {userResponse} = await readBody(event)
    const question = await generateQuestions(userResponse)

    return {
        question: question
    }
})

