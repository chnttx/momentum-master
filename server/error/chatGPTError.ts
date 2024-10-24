/**
 * Custom error class to handle ChatGPT-specific errors.
 * 
 * This class extends the built-in `Error` class in JavaScript to add a custom `statusCode` property.
 * It is designed to represent errors that occur while interacting with the ChatGPT API or similar systems.
 * 
 * @extends {Error}
 * 
 * @property {number} statusCode - The HTTP status code associated with the error.
 * 
 * @constructor
 * @param {number} statusCode - The HTTP status code representing the error type.
 * @param {string} message - A descriptive error message.
 */
export class chatGPTError extends Error {
    private readonly statusCode: number;

    /**
     * Creates an instance of chatGPTError.
     * 
     * @param {number} statusCode - The HTTP status code representing the error type.
     * @param {string} message - A descriptive error message for the error.
     */
    constructor(statusCode: number, message: string) {
        super(message);  // Call the base class constructor with the error message
        this.statusCode = statusCode;  // Assign the status code
    }

    /**
     * Getter for the status code of the error.
     * 
     * @returns {number} The HTTP status code associated with the error.
     */
    get status() {
        return this.statusCode;
    }
}
