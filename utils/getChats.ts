import { type Chat } from "../types/chat";
import resetLocalStorage from "./resetLocalStorage";

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
            resetLocalStorage();
            return [] as Chat[];
        }
    }

    return chats;
}
