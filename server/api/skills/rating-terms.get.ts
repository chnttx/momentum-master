import {getSkillsRatingTerms} from "~/server/services/skill-used";

/**
 * POST endpoint to retrieve all rating terms from the postgres database
 */
export default defineEventHandler(async (event) => {
    try {
        return await getSkillsRatingTerms()
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
    }
})