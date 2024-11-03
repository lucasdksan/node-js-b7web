import { BadRequestError } from "../../../shared/app/errors/bad-request.error";
import { UseCase as DefaultUseCase } from "../../../shared/app/usecases/usecase";
import { PetRepository } from "../../domain/repositories/pet.repository";
import { PetOutput, PetOutputMapper } from "../dtos/pet.dto";

export namespace UpdatePet {
    export type Input = {
        id: string;
        race?: string;
        gender?: "Masculino" | "Feminino";
        color?: string;
        image?: string;
    };

    export type Output = PetOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private petRepository: PetRepository.Repository) {}

        async execute(input: Input): Promise<Output> {
            if(!input.id || input.id.length === 0) throw new BadRequestError("Id not provided");

            const { id, ...data } = input;
            const entity = await this.petRepository.findById(id);

            entity.update({ ...data });

            await this.petRepository.update(entity);

            return PetOutputMapper.toOutput(entity);
        }

    }
}