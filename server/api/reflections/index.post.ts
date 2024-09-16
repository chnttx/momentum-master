import {getServerSession} from "#auth";
import {getUserByUsername} from "~/server/services/user";
import {Session} from "next-auth";
import {insertNewReflection} from "~/server/services/reflection";

interface Body {
    date: string,
    moodRating: number,
    skillUsedId: number,
    skillRatingId: number,
    questionsAndResponses: [{
        questionId: number,
        response: string
    }]
}

/**
 * Post endpoint insert reflection into database
 * body should contain

 */
export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);


    if (!session) {
        setResponseStatus(event, 403, "No session cookie")
        return;
    }

    const { user: { email }} = session
    const user: { user_id: number, username: string, profile_image: string | null } | null  =
        await getUserByUsername({ username: email })

    if (!user) {
        setResponseStatus(event, 403, "No user found")
        return;
    }
    try {

        const { user_id: userId } = user
        let { date, moodRating, skillId, skillRatingId, questionsAndResponses } = await readBody(event);
        date = new Date(date)
        const { reflection, skillUsed } = await insertNewReflection({
            userId,
            date,
            moodRating,
            skillId,
            skillRatingId,
            questionsAndResponses
        })
        return {
            reflection: reflection,
            skillUsed: skillUsed
        }
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
        return;
    }

})

