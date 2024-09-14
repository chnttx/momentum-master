/**
 * Retrieve the state of the reflection session from local storage
 *
 * @return {Boolean} The completion state of the reflection session
 */
export default function () {
    const endSession = JSON.parse(localStorage.getItem("endSession") as string);
    if (endSession !== null) return endSession;
    return false;
}
