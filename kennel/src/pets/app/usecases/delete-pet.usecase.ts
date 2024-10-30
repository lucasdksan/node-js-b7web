import { PetRepository } from "@/pets/domain/repositories/pet.repository";
import { UseCase as DefaultUseCase } from "@/shared/app/usecases/usecase";

export namespace DeletePet {
    export type Input = {
        id: string;
    }

    export type Output = void;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private petRepository: PetRepository.Repository) {}

        async execute(input: Input): Promise<void> {
            const { id } = input;

            await this.petRepository.delete(id);
        }
    }
}