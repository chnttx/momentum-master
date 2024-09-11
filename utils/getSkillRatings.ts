import { type SkillRating } from "~/types/skillRating";

export default function () {
    const skillRatings = JSON.parse(
        localStorage.getItem("skillRatings") as string
    );
    if (skillRatings) return skillRatings;
    return [] as SkillRating[];
}
