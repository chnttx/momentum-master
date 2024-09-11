export default function () {
    const mood = JSON.parse(localStorage.getItem("moodRating") as string);
    if (mood) return mood;
    return null;
}
