import type { Chat } from "~/types/Chat";

const GREETING_QUESTION = { question: "How was your day?", id: 1 };
const RECOMMENDATION_QUESTION = {
    question: "What would you like to learn?",
    id: 100,
};

export const useChat = () => {
    const chat = useState<Chat>("chat", () => {
        const today = new Date();
        return {
            date: today.toISOString(),
            chatlog: [],
            questionResponses: [],
        };
    });

    const waitingForResponse = useState<Boolean>(
        "waitingForResponse",
        () => false
    );

    const currentID = useState<number>("currentID", () => 1);

    const setChat = (newChat: Chat) => {
        if (newChat?.chatlog && newChat?.questionResponses) {
            chat.value = newChat;
            if (import.meta.client)
                localStorage.setItem("chat", JSON.stringify(chat.value));
        }
    };

    const fakeId = useState<number>("fakeId", () => 2);
    // Create a new question response and add to the questionResponses array
    const fetchNewQuestion = (prevResponse: string) => {
        // New question api

        // Dev
        fakeId.value++;
        currentID.value = fakeId.value;

        chat?.value.questionResponses.push({
            id: currentID.value,
            question: "Tell me more!",
        });

        waitingForResponse.value = false;
    };

    // Add user's response to the previous question
    const addUserResponse = (questionId: number, newResponse: string) => {
        console.log(questionId, newResponse);
        chat?.value.chatlog.push(newResponse);
        chat.value.questionResponses = chat.value.questionResponses.map(
            (questionResponse) => {
                if (questionResponse.id == questionId)
                    return { ...questionResponse, response: newResponse };
                return questionResponse;
            }
        );
        if (import.meta.client)
            localStorage.setItem("chat", JSON.stringify(chat.value));
        waitingForResponse.value = true;
    };

    const initChat = () => {
        setChat(getChat());
        if (chat?.value.questionResponses.length === 0) {
            let today = new Date();
            chat.value.date = today.toISOString();
            chat.value.chatlog.push(GREETING_QUESTION.question);
            chat.value.questionResponses.push({ ...GREETING_QUESTION });
        }
        currentID.value =
            chat.value.questionResponses[
                chat.value.questionResponses.length - 1
            ].id;
    };

    return {
        chat,
        waitingForResponse,
        currentID,
        setChat,
        initChat,
        fetchNewQuestion,
        addUserResponse,
    };
};
