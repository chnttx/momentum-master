/**
 * Retrieve the user's selected skills from local storage
 *
 * @return {string[]} The skills
 */
export default function () {
    const skills = JSON.parse(localStorage.getItem("skills") as string);
    if (skills) return skills;
    return [] as string[];
}
