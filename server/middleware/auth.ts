/**
 * Middleware that checks for user authentication on protected API routes.
 * 
 * This event handler ensures that if a request is made to a protected route (e.g., `/api/*` excluding `/auth` routes),
 * the request will be blocked unless the user is authenticated via a valid session.
 * 
 * It throws an error with status code 403 ("Unauthenticated") if:
 * 1. The request is directed towards a protected API route (any route containing "api" but not "auth").
 * 2. There is no valid session associated with the request.
 * 
 * @param {H3Event} event - The incoming request event, which contains the request URL and session data.
 * 
 * @throws {Error} 403 - If the user is not authenticated and is trying to access a protected route.
 */
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event); // Retrieve the current session
    const url = getRequestURL(event); // Get the URL of the current request

    // Determine if the route is protected (any API route except authentication routes)
    const isProtected = url.href.includes("api") && !url.href.includes("auth");

    // If the user is not authenticated and the route is protected, throw a 403 error
    if (!session && isProtected) {
        throw createError({
            statusMessage: "Unauthenticated", // Error message
            statusCode: 403, // HTTP 403 status code
        });
    }
});
