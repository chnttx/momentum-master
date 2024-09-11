import {generateQuestions} from "~/server/services/reflection";

/**
 *
 */
export default defineEventHandler(async (event) => {
    const {userResponse} = await readBody(event)
    console.log(userResponse)
    const question = await generateQuestions(userResponse)

    return {
        question: question
    }
})

