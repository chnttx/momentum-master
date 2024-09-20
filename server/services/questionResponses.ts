import prisma from "~/lib/prisma";

/**
 * questionsAndResponses is an array of objects with questions and answers
 * Inserts all questionsAndResponses into the question_responses table within the postgres database
 */
export const addQuestionAndResponses = async ({ questionsAndResponses, reflectionId }: {
    questionsAndResponses: {
        questionId: number,
        response: string
    }[],
    reflectionId: number
    }) => {
    return prisma.$transaction(
        questionsAndResponses.map(qAndR => {
            return prisma.question_response.create({
                data: {
                    reflection_id: reflectionId,
                    question_id: qAndR.questionId,
                    answer: qAndR.response
                }
            })
        })
    );





}