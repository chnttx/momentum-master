import { getSkillUsedByUser } from "~/server/services/skill-used";
import { extractUserFromSession } from "~/server/services/session";
/**
 * GET endpoint to retrieve all skills from the database
 */
export default defineEventHandler(async (event) => {
    const user = await extractUserFromSession(event);
    if (!user) {
        return;
    }

    try {
        const { user_id: userId } = user;
        return getSkillUsedByUser(userId);
    } catch (err) {
        setResponseStatus(event, 400);
        return;
    }
});
