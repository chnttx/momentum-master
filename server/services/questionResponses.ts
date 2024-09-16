import prisma from "~/lib/prisma";

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