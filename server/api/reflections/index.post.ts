import { insertNewReflection } from "~/server/services/reflection";
import {extractUserFromSession} from "~/server/services/session";
import {QuestionAnswersInterface} from "~/server/interface/QuestionAnswersInterface";

interface Body {
    date: string | Date /* yyyy-mm-dd format */;
    moodRating: number;
    skillId: number;
    skillRatingId: number;
    questionsAndResponses: QuestionAnswersInterface[];
}

/**
 * Post endpoint to insert reflection into database
 * body should contain everything in the body interface

 */
export default defineEventHandler(async (event) => {

    const user = await extractUserFromSession(event)
    if (!user) {
        return
    }
    try {
        const { user_id: userId } = user;
        let {
            date,
            moodRating,
            skillId,
            skillRatingId,
            questionsAndResponses,
        }: Body = await readBody(event);
        date = new Date(date);
        const { reflection, skillUsed, qAndR } = await insertNewReflection({
            userId,
            date,
            moodRating,
            skillId,
            skillRatingId,
            questionsAndResponses,
        });
        return {
            reflection: reflection,
            skillUsed: skillUsed,
            questionsAndResponses: qAndR,
        };
    } catch (err) {
        console.error(err);
        setResponseStatus(event, 400);
        return;
    }
});
