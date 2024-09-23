
import {getAllReflectionsByUser} from "~/server/services/reflection";
import {extractUserFromSession} from "~/server/services/session";



export default defineEventHandler(async (event) => {
    const user = await extractUserFromSession(event)
    if (!user) {
        return
    }

    try {
        const { user_id: userId } = user
        return getAllReflectionsByUser(userId)
    } catch (err) {
        setResponseStatus(event, 400)
        return
    }




})