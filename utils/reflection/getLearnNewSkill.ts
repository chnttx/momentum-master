/**
 * Retrieve the state of the learning session from local storage
 *
 * @return {Boolean} The completion state of the learning session
 */
export default function () {
    const learnNewSkill = JSON.parse(
        localStorage.getItem("learnNewSkill") as string
    );
    if (learnNewSkill !== null) return learnNewSkill;
    return false;
}
