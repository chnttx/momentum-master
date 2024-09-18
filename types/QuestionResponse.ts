/**
 * @typedef {Object} QuestionResponse
 * @property {number} id The question ID
 * @property {string} question The content of the question
 * @property {string} response The corresponding user response
 */
export type QuestionResponse = {
    id: number;
    question: string;
    response?: string;
};
