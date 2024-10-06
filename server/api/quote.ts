export default defineEventHandler(async (event) => {
    const response = await $fetch("https://zenquotes.io/api/random");

    return {
        quote: response[0].q,
        author: response[0].a,
    };
});
