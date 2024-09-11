import {openAIClient} from "~/server/services/chatgptClient";
import prisma from "~/lib/prisma";

/**
 * Queries the chatGPT LLM for a STAR question based on user's initial response to "How was your day?"
 * Takes in userResponse: string as input and outputs a string, the question
 */
export const generateQuestions = async ( userResponse: string ) => {
    const questions: {question_id: number, description: string}[] = await getAllQuestions()
    const questionsString: string = questions.map(q => `${q.description}\n`).toString()
    const prompt = `Based on the user's response, select the most appropriate question to respond with from these list 
    of questions: \n ${questionsString}`
    console.log(prompt)
    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": userResponse
            }

        ]
    })
    return response.choices[0].message.content


}

/**
 * Queries the database for all the questions currently stored
 * Returns a list of strings
 */
const getAllQuestions = () => {
    return prisma.question.findMany()
}