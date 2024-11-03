import { PetOutput, PetOutputMapper } from "../dtos/pet.dto";
import { UseCase as DefaultUseCase } from "../../../shared/app/usecases/usecase";
import { PetRepository } from "../../domain/repositories/pet.repository";
import { PetEntity } from "../../domain/enitities/pet.entity";

export namespace GetPet {
    export type Input = {
        id: string;
    };

    export type Output = PetOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private petRepository: PetRepository.Repository) {}

        private toOutput(entity: PetEntity): Output {
            return PetOutputMapper.toOutput(entity);
        }

        async execute(input: Input): Promise<PetOutput> {
            const { id } = input;
            
            const result = await this.petRepository.findById(id);

            return this.toOutput(result);
        }
        
    }
}