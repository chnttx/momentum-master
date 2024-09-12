/**
 * Retrieve the user's mood rating from local storage
 *
 * @return {number | null} The user's mood rating
 */
export default function () {
    const mood = JSON.parse(localStorage.getItem("moodRating") as string);
    if (mood) return mood;
    return null;
}
