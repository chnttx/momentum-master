import { queryChatGPT } from "~/server/services/chatgptClient";
import prisma from "~/lib/prisma";
import {storeUserSkillRating} from "~/server/services/skill-used";

/**
 * Queries the chatGPT LLM for a STAR question based on user's initial response to "How was your day?"
 * Takes in userResponse: string as input and outputs a string, the question
 */
export const generateQuestions = async ( userResponse: string ) => {
    let questions: {question_id: number, description: string}[] = await getAllQuestions()
    questions = questions.filter(q => q.question_id != 1)
    const questionsString: string = questions.map(q => `${q.description}\n`).toString()
    const prompt = `Based on the user's response, select the most appropriate question to respond with from these list 
    of questions. Only state the question. \n\n ${questionsString}. `

    const { message } = await queryChatGPT({systemQuery: prompt, userQuery: userResponse })


    return message


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


export const insertNewReflection = async ({ userId, date, moodRating, skillId, skillRatingId, questionsAndResponses }: {
    userId: number, date: Date, moodRating: number, skillId: number, skillRatingId: number, questionsAndResponses: {
        questions: string,
        answers: string
    }
    }) => {
    const summary = "Placeholder Summary"

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


    return { reflection, skillUsed }
}