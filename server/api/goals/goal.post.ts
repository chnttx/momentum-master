import {extractUserFromSession} from "~/server/services/session";
import {createNewGoal, getGoalsByUser} from "~/server/services/goals";


export default defineEventHandler(async (event) => {
    const user = await extractUserFromSession(event);
    if (!user) {
        return;
    }
    const { user_id: userId } = user

    const { description } = await readBody(event)

    return createNewGoal(userId, description)

});
