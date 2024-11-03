import { BadRequestError } from "../../../shared/app/errors/bad-request.error";
import { UseCase as DefaultUseCase } from "../../../shared/app/usecases/usecase";
import { PetEntity } from "../../domain/enitities/pet.entity";
import { PetRepository } from "../../domain/repositories/pet.repository";
import { PetOutput, PetOutputMapper } from "../dtos/pet.dto";

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