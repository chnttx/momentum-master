// import type { Chat } from "~/types/Chat";

// export const useChat = () => {
//     const chat = useState<Chat[] | null>("chat", () => null);
//     const setChat = (newChat: Chat) => {
//         if (!chat.value) {
//             chat.value = newChat;
//             if (import.meta.client)
//                 localStorage.setItem("chat", JSON.stringify(chat.value));
//         }
//     };

//     const initChat = () => {
//         setChat(getChats());
//     };

//     return { chat, chatSelected, setChat, initChat };
// };
