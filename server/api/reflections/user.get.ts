/**
 * Event handler to fetch all reflections for the authenticated user.
 * 
 * This handler extracts the user from the session and fetches all reflections associated with the user's ID.
 * If the user is not authenticated or an error occurs, appropriate response statuses are set.
 * 
 * @async
 * 
 * @param {H3Event} event - The event object representing the incoming HTTP request.
 * 
 * @returns {Promise<Array<Reflection> | void>} - Returns an array of reflections for the user or nothing if an error occurs or user is not found.
 * 
 * Example response:
 * ```json
 * [
 *   {
 *     "reflection_id": 1,
 *     "date": "2024-10-24",
 *     "summary": "Reflection summary here..."
 *   },
 *   ...
 * ]
 * ```
 */
import {getAllReflectionsByUser} from "~/server/services/reflection";
import {extractUserFromSession} from "~/server/services/session";

export default defineEventHandler(async (event) => {
    // Extract the authenticated user from the session
    const user = await extractUserFromSession(event)
    if (!user) {
        return
    }

    try {
        const { user_id: userId } = user;
        // Fetch and return all reflections for the user
        return getAllReflectionsByUser(userId);
    } catch (err) {
        // Set response status to 400 in case of error
        setResponseStatus(event, 400);
        return;
    }
});
