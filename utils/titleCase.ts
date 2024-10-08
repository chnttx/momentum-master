/**
 * Convert string to title case
 *
 * @return {string} String in title case
 */
export default function titleCase(str: string) {
    let strArr = str.toLowerCase().split(" ");
    for (let i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(" ");
}
