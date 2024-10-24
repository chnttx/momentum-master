/**
 * Logs each incoming HTTP request to the server with its method and URL, along with the current timestamp.
 * 
 * This event handler logs requests using the console, where each log entry contains:
 * 1. The current timestamp in ISO format.
 * 2. The HTTP method of the request (e.g., GET, POST).
 * 3. The request URL.
 * 
 * @param {H3Event} event - The incoming request event containing details like method and URL.
 */
export default defineEventHandler((event) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    // Log the request method, timestamp, and URL
    console.log(
        date.toISOString() + "\t" + event.method + "\t" + getRequestURL(event)
    );
});
