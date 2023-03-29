
export class DecisionValidationError extends Error {
    constructor(message: string) {
        super(`Decision validation error: ${message}`);
    }
}