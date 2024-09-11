export default function () {
    const skills = JSON.parse(localStorage.getItem("skills") as string);
    if (skills) return skills;
    return [] as string[];
}
