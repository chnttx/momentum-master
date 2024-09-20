import {getAllSkills} from "~/server/services/skill";

/**
 * GET endpoint to retrieve all skills from the database
 */
export default defineEventHandler(async (event) => {
    try {
        return await getAllSkills();
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
    }
})