import {getSkillsRatingTerms} from "~/server/services/skill-used";

export default defineEventHandler(async (event) => {
    try {
        return await getSkillsRatingTerms()
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
    }
})