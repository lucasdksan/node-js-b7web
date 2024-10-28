import { PetEntity, PetProps } from "@/pets/domain/enitities/pet.entity";
import { PetDB } from "../dtos/pet-in-file.dto";
import { ValidationError } from "@/shared/domain/errors/validation.error";

export class PetModelMapper {
    static toEntity(model: PetDB){
        const data: PetProps = {
            color: model.color,
            gender: model.gender,
            image: model.image,
            race: model.race,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
        };

        try {
            return new PetEntity(data, model.id);
        } catch(err) {
            throw new ValidationError("An entity not be loaded");
        }
    }
}