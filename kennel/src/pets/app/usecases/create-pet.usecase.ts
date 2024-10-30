import { UseCase as DefaultUseCase } from "@/shared/app/usecases/usecase";
import { PetOutput, PetOutputMapper } from "../dtos/pet.dto";
import { BadRequestError } from "@/shared/app/errors/bad-request.error";
import { PetRepository } from "@/pets/domain/repositories/pet.repository";
import { PetEntity } from "@/pets/domain/enitities/pet.entity";

export namespace CreatePet{
    export type Input = { 
        race: string;
        gender: "Masculino" | "Feminino";
        color: string;
        image: string;
    };
    
    export type Output =  PetOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private petRepository: PetRepository.Repository) {}

        async execute(input: Input): Promise<Output> {
            const { color, gender, image, race } = input;
            
            if(!color || !gender || !image || !race) throw new BadRequestError("Input data not provided");

            const entity = new PetEntity({
                color,
                gender,
                image,
                race,
                createdAt: new Date(),
            });

            await this.petRepository.insert(entity);

            return PetOutputMapper.toOutput(entity);
        }
        
    } 
}