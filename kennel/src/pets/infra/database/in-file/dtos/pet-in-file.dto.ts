import { PetProps } from "../../../../domain/enitities/pet.entity";

export type PetDB = {
    id: string;
} & PetProps;