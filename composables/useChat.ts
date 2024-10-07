import type { Chat } from "~/types/Chat";
import getRecommendationArr from "~/utils/reflection/getRecommendationArr";
import {useSkill} from "~/composables/useSkill";
import {ca} from "cronstrue/dist/i18n/locales/ca";

const GREETING_QUESTION = { question: "What did you do today?", id: -1 };
const RECOMMENDATION_QUESTION = {
    question: "Do you want to receive recommendations?",
    id: -2,
};

export const useChat = () => {
    const { skill } = useSkill()

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

    const currentIndex = useState<number>("currentIndex", () => 0);

    const recommendationArr = useState<string[]>("recommendationArr", () => []);

    const setChat = (newChat: Chat) => {
        if (newChat?.chatlog && newChat?.questionResponses) {
            chat.value = newChat;
            if (import.meta.client)
                localStorage.setItem("chat", JSON.stringify(chat.value));
        }
    };

    const setRecommendationArr = (newRecommendationArr: string[]) => {
        recommendationArr.value = newRecommendationArr;
        if (import.meta.client)
            localStorage.setItem(
                "recommendationArr",
                JSON.stringify(recommendationArr.value)
            );
    };

    // Create a new question response and add to the questionResponses array
    const fetchNewQuestion = async (prevResponse: string) => {
        const questionsAsked = chat?.value.questionResponses.map(c => c.id)
        let response;
        try {

            response = await $fetch("/api/ai/question", {
                method: "POST",
                body: {
                    userResponse: prevResponse,
                    questionsAsked: questionsAsked,
                    skillFocus: skill
                },
            });
        } catch (err) {
            // todo: Add error handling for when a question isn't generated properly
            console.error(err)
            return;
        }

        console.log(response);

        let question: { id: number; text: string } =
            response != null
                ? { id: response.question_id, text: response.description }
                : {
                      id: GREETING_QUESTION.id,
                      text: GREETING_QUESTION.question,
                  };

        currentIndex.value++;

        chat?.value.questionResponses.push({
            id: question.id,
            question: question.text,
        });
        chat?.value.chatlog.push(question.text);
        if (import.meta.client)
            localStorage.setItem("chat", JSON.stringify(chat.value));
        waitingForResponse.value = false;
    };

    // Add user's response to the previous question
    const addUserResponse = (newResponse: string) => {
        chat?.value.chatlog.push(newResponse);
        chat.value.questionResponses[currentIndex.value].response = newResponse;
        if (import.meta.client)
            localStorage.setItem("chat", JSON.stringify(chat.value));
        waitingForResponse.value = true;
    };

    const fetchRecommendation = async (skill: string) => {
        const chatlog = chat.value.chatlog.join("\n");

        const response = await $fetch("/api/ai/resources", {
            method: "POST",
            body: {
                userResponse: chatlog,
                skill,
            },
        });

        if (skill !== undefined) {
            chat?.value.questionResponses.push({
                id: RECOMMENDATION_QUESTION.id,
                question: RECOMMENDATION_QUESTION.question,
                response: preprocessRecommendationResponse(response),
            });

            if (import.meta.client)
                localStorage.setItem("chat", JSON.stringify(chat.value));
        }
    };

    const preprocessRecommendationResponse = (
        response: {
            resources: string | null;
        } | null
    ) => {
        if (response == null || response.resources == null) return "Resources";
        let recommendations = response.resources
            .replaceAll("[", "")
            .replaceAll("]", "");
        let arr = recommendations.split(",");
        arr = arr.map((resource) => resource.trim());
        setRecommendationArr(arr);
        return recommendations;
    };

    const initChat = () => {
        setChat(getChat());
        if (chat?.value.questionResponses.length === 0) {
            let today = new Date();
            chat.value.date = today.toISOString();
            chat.value.chatlog.push(GREETING_QUESTION.question);
            chat.value.questionResponses.push({ ...GREETING_QUESTION });
        }
        currentIndex.value = chat.value.questionResponses.length - 1;
        setRecommendationArr(getRecommendationArr());
    };

    return {
        chat,
        waitingForResponse,
        currentIndex,
        recommendationArr,
        setChat,
        initChat,
        fetchNewQuestion,
        addUserResponse,
        fetchRecommendation,
        RECOMMENDATION_QUESTION,
    };
};
