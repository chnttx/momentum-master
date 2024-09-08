import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    const url = getRequestURL(event);
    const isProtected = url.href.includes("api") && !url.href.includes("auth");
    if (!session && isProtected) {
        throw createError({
            statusMessage: "Unauthenticated",
            statusCode: 403,
        });
    }
});
