import prisma from "~/lib/prisma";
import {QuestionAnswersInterface} from "~/server/interface/QuestionAnswersInterface";

/**
 * questionsAndResponses is an array of objects with questions and answers
 * Inserts all questionsAndResponses into the question_responses table within the postgres database
 */
export const addQuestionAndResponses = async ({ questionsAndResponses, reflectionId }: {
    questionsAndResponses: QuestionAnswersInterface[],
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