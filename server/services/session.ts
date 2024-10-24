import {EventHandlerRequest, H3Event} from "h3";
import {Session} from "next-auth";
import {getServerSession} from "#auth";
import assert from "node:assert";
import {getUserByUsername} from "~/server/services/user";

/**
 * Extracts the user from the session based on the event.
 * 
 * This function retrieves the user session from the event, verifies the session
 * and user's email, and then fetches the corresponding user from the database
 * using their email as the username. If any step fails, appropriate HTTP status
 * codes are set and an error message is returned.
 * 
 * @param {H3Event<EventHandlerRequest>} event - The event containing the user's session data.
 * @returns {Promise<{user_id: number, username: string, profile_image: string | null} | undefined>} 
 *          The user object if found, otherwise undefined if an error occurs.
 */
export const extractUserFromSession = async (event:  H3Event<EventHandlerRequest>) => {
    const session: Session | null = await getServerSession(event);

    assert(session !== null)

    if (!session.user?.email) {
        setResponseStatus(event, 410, "User account has been deleted or is not valid");
        return;
    }

    const {
        user: { email },
    } = session;
    
    const user: {
        user_id: number;
        username: string;
        profile_image: string | null;
    } | null = await getUserByUsername({ username: email });

    if (!user) {
        setResponseStatus(event, 403, "No user found");
        return;
    }

    return user
}