import type { QuestionResponse } from "./QuestionResponse";
/**
 * @typedef {Object} Chat
 * @property {string} date The date of the reflection
 * @property {string} chatlog A record of the entire chat
 * @property {QuestionResponse} questionResponses The content of the chat
 */
export type Chat = {
    date: string;
    chatlog: string[];
    questionResponses: QuestionResponse[];
};
