import { getGoalsByUser } from "~/server/services/goals";
import { extractUserFromSession } from "~/server/services/session";

/**
 * API endpoint to get all goals by a user
 */
export default defineEventHandler(async (event) => {
    const user = await extractUserFromSession(event);
    if (!user) {
        return;
    }

    try {
        const { user_id: userId } = user;
        return getGoalsByUser(userId);
    } catch (err) {
        setResponseStatus(event, 400);
        return;
    }
});
