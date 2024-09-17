/**
 * Remove local storage items
 *
 */
export default function () {
    localStorage.removeItem("chat");
    localStorage.removeItem("moodRating");
    localStorage.removeItem("skill");
    localStorage.removeItem("skillRating");
    localStorage.removeItem("isReflection");
    localStorage.removeItem("endSession");
    localStorage.removeItem("learnNewSkill");
}
