import { type SkillRating } from "~/types/skillRating";
/**
 * Retrieve the user's skill ratings from local storage
 *
 * @return {SkillRating[]} The skill ratings
 */
export default function () {
    const skillRatings = JSON.parse(
        localStorage.getItem("skillRatings") as string
    );
    if (skillRatings) return skillRatings;
    return [] as SkillRating[];
}
