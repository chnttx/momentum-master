import type { Skill } from "~/types/Skill";

/**
 * Retrieve the user's selected skill from local storage
 *
 * @return {Skill | null} The skill
 */
export default function () {
    const skill = JSON.parse(localStorage.getItem("skill") as string);
    if (skill) return skill;
    return null;
}
