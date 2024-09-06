export default defineEventHandler((event) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    // Add a destination to store log
    console.log(
        date.toISOString() + "\t" + event.method + "\t" + getRequestURL(event)
    );
});
