import { ValidationError } from "../../../../../shared/domain/errors/validation.error";
import { PetEntity, PetProps } from "../../../../domain/enitities/pet.entity";
import { PetDB } from "../dtos/pet-in-file.dto";

export class PetModelMapper {
    static toEntity(model: PetDB){
        const data: PetProps = {
            color: model.color,
            gender: model.gender,
            image: model.image,
            race: model.race,
            createdAt: typeof model.createdAt === "string" ? new Date(model.createdAt) : model.createdAt,
            updatedAt: typeof model.updatedAt === "string" ? new Date(model.updatedAt) : model.updatedAt
        };

        try {
            return new PetEntity(data, model.id);
        } catch(err) {
            throw new ValidationError("An entity not be loaded");
        }
    }
}