import {EventHandlerRequest, H3Event} from "h3";
import {Session} from "next-auth";
import {getServerSession} from "#auth";
import assert from "node:assert";
import {getUserByUsername} from "~/server/services/user";

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