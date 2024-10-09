import {extractUserFromSession} from "~/server/services/session";
import {createNewGoal, getGoalsByUser} from "~/server/services/goals";

/**
 * POST API endpoint to create a new goal in the database
 */
export default defineEventHandler(async (event) => {
    const user = await extractUserFromSession(event);
    if (!user) {
        return;
    }
    const { user_id: userId } = user

    const { description } = await readBody(event)

    return createNewGoal(userId, description)

});
