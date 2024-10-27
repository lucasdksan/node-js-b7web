import { IContact } from "../entity/i_contact";

export type CustomResponse = {
    status: number;
    error: {
        exist: boolean;
        text: string | null;
    }; 
    data: any;
}

export interface IService {
    create(value: string): Promise<CustomResponse>;
    list(): Promise<CustomResponse>;
    get(value: string): Promise<CustomResponse>;
    delete(value: string): Promise<CustomResponse>;
    update(id: string, value: string): Promise<CustomResponse>;
}