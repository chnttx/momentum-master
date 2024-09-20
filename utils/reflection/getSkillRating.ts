/**
 * Retrieve the user's skill rating from local storage
 *
 * @return {number | null} The skill rating
 */
export default function () {
    const skillRating = JSON.parse(
        localStorage.getItem("skillRating") as string
    );
    if (skillRating) return skillRating;
    return null;
}
