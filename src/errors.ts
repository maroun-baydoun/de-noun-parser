

export class ParsingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ParsingError";
    }
}

export class UnrecognisedGenderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnrecognisedGenderError";
    }
}