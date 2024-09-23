
import {getReflectionById} from "~/server/services/reflection";

/*
    GET endpoint to get a specific reflection. Should send in reflection Id as a query parameter
 */
import {extractUserFromSession} from "~/server/services/session";
export default defineEventHandler(async (event) => {
    let { reflectionId }: { reflectionId: string} = getQuery(event)


    let id: number = Number(reflectionId)


    const user = await extractUserFromSession(event)
    if (!user) {
        return
    }
    try {

        const reflection = await getReflectionById(id)
        if (reflection?.user_id !== user.user_id) {
            setResponseStatus(event, 403, "User does not own reflection")
            return
        }

        return reflection
    } catch (err) {
        setResponseStatus(event, 400)
        console.error(err)
        return
    }

})