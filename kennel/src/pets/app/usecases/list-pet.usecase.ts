import { UseCase as DefaultUseCase } from "../../../shared/app/usecases/usecase";
import { PetEntity } from "../../domain/enitities/pet.entity";
import { PetRepository } from "../../domain/repositories/pet.repository";
import { PetOutput, PetOutputMapper } from "../dtos/pet.dto";

export namespace ListPet {
    export type Input = null;
    export type Output = PetOutput[];

    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private petRepository: PetRepository.Repository) {}

        private toOutput(entities: PetEntity[]): Output {
            const output = entities.map((entity) => {
                return PetOutputMapper.toOutput(entity);
            });

            return output;
        }

        async execute(): Promise<Output> {
            const result = await this.petRepository.findAll();
        
            return this.toOutput(result);
        }
    }
}