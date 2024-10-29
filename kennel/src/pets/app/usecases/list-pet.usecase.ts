import { UseCase as DefaultUseCase } from "@/shared/app/usecases/usecase";
import { PetRepository } from "@/pets/domain/repositories/pet.repository";

export namespace ListPet {
    export class UseCase {
        constructor(private petRepository: PetRepository.Repository) {}
    }
}