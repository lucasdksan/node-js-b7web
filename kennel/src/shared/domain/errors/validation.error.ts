import { ZodError } from "zod";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
    constructor(public error: ZodError<{
        race: string;
        gender: "Masculino" | "Feminino";
        color: string;
        image: string;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }>){
        super("Entity Validation Error");
        this.name = "Entity Validation Error";
    }
}