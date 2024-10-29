import { PetEntity } from "@/pets/domain/enitities/pet.entity";

export type PetOutput = {
    id: string;
    race: string;
    gender: "Masculino" | "Feminino";
    color: string;
    image: string;
}

export class PetOutputMapper {
    static toOutput(entity: PetEntity): PetOutput {
        const { createdAt, updatedAt, ...pet } = entity.toJSON();

        return pet;
    }
}