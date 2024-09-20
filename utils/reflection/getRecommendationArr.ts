/**
 * Retrieve the user's resource recommendations history of the day from local storage
 * @return {string[]} The resource recommendations history of the day
 */
export default function () {
    let recommendationArr = JSON.parse(
        localStorage.getItem("recommendationArr") as string
    );

    if (!recommendationArr) return [] as string[];
    return recommendationArr;
}
