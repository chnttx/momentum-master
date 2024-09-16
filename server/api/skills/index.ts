import {getAllSkills} from "~/server/services/skill";

export default defineEventHandler(async (event) => {
    try {
        return await getAllSkills();
    } catch (err) {
        console.error(err)
        setResponseStatus(event, 400)
    }
})