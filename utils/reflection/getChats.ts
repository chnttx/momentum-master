import { type Chat } from "../../types/Chat";
import resetReflectionLocalStorage from "./resetReflectionLocalStorage";
import resetLocalStorage from "./resetReflectionLocalStorage";
/**
 * Retrieve the user's chat history of the day from local storage, and
 * reset local storage if the last message was from a different date
 *
 * @return {Chat[]} The chat history of the day
 */
export default function () {
    let chats = JSON.parse(localStorage.getItem("chats") as string);
    if (!chats) {
        return [] as Chat[];
    }

    if (chats?.length !== 0) {
        let today = new Date();
        let latestMessageDate = new Date(chats[chats.length - 1].time);
        let isSameDay =
            today.getDate() == latestMessageDate.getDate() &&
            today.getMonth() == latestMessageDate.getMonth() &&
            today.getFullYear() == latestMessageDate.getFullYear();
        if (!isSameDay) {
            resetReflectionLocalStorage();
            return [] as Chat[];
        }
    }
    return chats;
}
