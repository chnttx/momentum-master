export class chatGPTError extends Error {
    private readonly statusCode: number;

    constructor(statusCode: number, message: string) {

        super(message);
        this.statusCode = statusCode

    }

    get status() {
        return this.statusCode
    }

}