/**
 * Event handler to fetch and return a random quote.
 * 
 * This handler makes a request to the ZenQuotes API to retrieve a random quote
 * and returns the quote along with the author's name in the response.
 * 
 * @async
 * 
 * @param {H3Event} event - The event object representing the incoming HTTP request.
 * 
 * @returns {Promise<{quote: string, author: string}>} - An object containing the quote and its author.
 * 
 * Example response:
 * ```json
 * {
 *   "quote": "The only limit to our realization of tomorrow is our doubts of today.",
 *   "author": "Franklin D. Roosevelt"
 * }
 * ```
 */
export default defineEventHandler(async (event) => {
    // Fetches a random quote from ZenQuotes API
    const response: Array<any> = await $fetch(
        "https://zenquotes.io/api/random"
    );

    // Returns the quote text and author name
    return {
        quote: response[0].q,   // The quote text
        author: response[0].a,  // The quote's author
    };
});
