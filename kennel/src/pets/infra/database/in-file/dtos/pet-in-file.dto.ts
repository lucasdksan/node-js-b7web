import { PetProps } from "@/pets/domain/enitities/pet.entity";

export type PetDB = {
    id: string;
} & PetProps;