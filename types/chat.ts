/**
 * @typedef {Object} Chat
 * @property {Boolean} isUser Is the message created by the user
 * @property {Boolean} isReflection Is the message a part of the reflection
 * @property {string} text The content of the message
 * @property {number} time The creation time of the message in timestamp format
 */
export type Chat = {
    isUser: Boolean;
    isReflection: Boolean;
    text: string;
    time: number;
};
