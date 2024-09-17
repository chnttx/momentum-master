import type { Chat } from "../../types/Chat";
import resetReflectionLocalStorage from "./resetReflectionLocalStorage";
/**
 * Retrieve the user's chat history of the day from local storage, and
 * reset local storage if the last message was from a different date
 * @return {Chat} The chat history of the day
 */
export default function () {
    let chat = JSON.parse(localStorage.getItem("chat") as string);

    if (!chat) return null;

    let today = new Date();
    let chatDate = new Date(chat.date);
    let isSameDay =
        today.getDate() == chatDate.getDate() &&
        today.getMonth() == chatDate.getMonth() &&
        today.getFullYear() == chatDate.getFullYear();

    if (!isSameDay) {
        resetReflectionLocalStorage();
        return null;
    }
    return chat;
}
