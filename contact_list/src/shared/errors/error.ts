import { IError } from "./i_error";

export class Error implements IError {
    constructor(public readonly error: string, public readonly data: any) {}
}