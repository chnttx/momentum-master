import {queryChatGPT} from "~/server/services/chatgptClient";
import prisma from "~/lib/prisma";
import {storeUserSkillRating} from "~/server/services/skill-used";
import {addQuestionAndResponses} from "~/server/services/questionResponses";
import {QuestionAnswersInterface} from "~/server/interface/QuestionAnswersInterface";

/**
 * Queries the chatGPT LLM for a STAR question based on user's initial response to "How was your day?"
 * Takes in userResponse: string as input and outputs a string, the question
 */
export const generateQuestions = async ( userResponse: string ) => {
    let questions: {question_id: number, description: string}[] = await getAllQuestions()
    questions = questions.filter(q => q.question_id !== -1 && q.question_id !== -2)
    const questionsString: string = questions.map(q => `${q.question_id}: ${q.description}\n`).toString()
    const prompt = `Based on the user's response, select the most appropriate question to respond with from these list 
    of questions. Only state the question number. \n\n ${questionsString}. `

    const { message } = await queryChatGPT({systemQuery: prompt, userQuery: userResponse })

    if (!message) {
        throw new Error("No chatGPT response generated")
    }

    return prisma.question.findFirst({
        where: {
            question_id: +message
        }
    })


}

/**
 * Queries the database for all the questions currently stored
 * Returns a list of strings
 */
export const getAllQuestions = () => {
    return prisma.question.findMany()
}

/**
 *
 * @param userResponses a string for the user's previous responses
 * @param skill The skill that the user should get resources on
 * Returns a string of relevant resources for the skill
 */
export const getRecommendedResources = async ({ userResponses, skill }: { userResponses: string, skill: string }) => {
    const prompt = `Based on the user's responses, recommend learning resources for the skill ${skill}. Only state the
    recommended resources within a array list. For example, [resource1, resource2].`

    const { message } = await queryChatGPT({ systemQuery: prompt, userQuery: userResponses })

    return message

}

/**
 * Inserts a new reflection record into the reflection table. Also inserts according skill used records into the
 * skill_used table and all the questions and responses into the question_responses table
 */
export const insertNewReflection = async ({ userId, date, moodRating, skillId, skillRatingId, questionsAndResponses }: {
    userId: number, date: Date, moodRating: number, skillId: number, skillRatingId: number, questionsAndResponses: QuestionAnswersInterface[]
    }) => {
    const summary = await generateReflectionSummary(questionsAndResponses)

    const reflection = await prisma.reflection.create({
        data: {
            date: date,
            user_id: userId,
            mood_rating: moodRating,
            summary: summary

        }
    })

    const { reflection_id: reflectionId } = reflection
    const skillUsed = await storeUserSkillRating(reflectionId, skillRatingId, skillId )
    const qAndR = await addQuestionAndResponses({
        questionsAndResponses, reflectionId
    })


    return { reflection, skillUsed, qAndR }
}

export const getAllReflectionsByUser = async (userId: number) => {
    return prisma.reflection.findMany({
        where: {
            user_id: userId
        }
    })
}

export const getReflectionById = async (reflectionId: number) => {

    let reflection = await prisma.reflection.findFirst({
        where: {
            reflection_id: reflectionId
        },

        include: {

            question_responses: {
                include: {

                    question: {
                        select: {
                            description: true
                        }
                    }
                },


            }
        }
    })

    if (reflection !== null) {

        let questionResponses = reflection.question_responses
        const newQuestionResponses = questionResponses.map(response => {
            return {
                answer: response.answer,
                question: response.question.description
            }
        })

        return {
            reflection_id: reflection.reflection_id,
            date: reflection.date,
            user_id: reflection.user_id,
            summary: reflection.summary,
            mood_rating: reflection.mood_rating,
            question_responses: newQuestionResponses
        }
    }

}



export const generateReflectionSummary = async (chatHistory: QuestionAnswersInterface[]) => {
    let qAndRs = chatHistory.map(async (qAndR) => {
        const question = await prisma.question.findFirst({
            where: {
                question_id: qAndR.questionId
            }
        })
        const questionDescription = question?.description
        return `${questionDescription} ${qAndR.response}\n`
    })

    const s = await Promise.all(qAndRs)
    const chatHistoryString = s.reduce((allQAndRs, currQAndR) => allQAndRs + currQAndR, "")

    const systemQuery = "Generate a summary based on the user's chatHistory"
    const { message: summary } = await queryChatGPT({systemQuery, userQuery: chatHistoryString})
    if (summary === null) {
        throw new Error("ChatGPT failed to generate summary")
    }

    return summary
}