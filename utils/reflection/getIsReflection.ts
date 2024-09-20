/**
 * Retrieve the state of the reflection progress from local storage
 *
 * @return {Boolean} The completion state of the reflection progress
 */
export default function () {
    const isReflection = JSON.parse(
        localStorage.getItem("isReflection") as string
    );
    if (isReflection !== null) return isReflection;
    return true;
}
