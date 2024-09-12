/**
 * Remove local storage items
 *
 */
export default function () {
    localStorage.removeItem("chats");
    localStorage.removeItem("moodRating");
    localStorage.removeItem("skills");
    localStorage.removeItem("skillRatings");
    localStorage.removeItem("isReflection");
}
