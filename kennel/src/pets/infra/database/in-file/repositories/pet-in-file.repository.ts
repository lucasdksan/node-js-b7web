import { PetEntity } from "@/pets/domain/enitities/pet.entity";
import { PetRepository } from "@/pets/domain/repositories/pet.repository";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { InFileDataBase } from "@/shared/infra/database/infile.database";
import { PetDB } from "../dtos/pet-in-file.dto";
import { PetModelMapper } from "../models/pet-mapper.model";

export class PetInFileRepository implements PetRepository.Repository {
    constructor(private readonly inFileDataBase: InFileDataBase<PetDB>) {  }

    private async getValues(): Promise<PetDB[]> {
        const data = await this.inFileDataBase.getFile();

        return data;
    }

    private async _get(id: string): Promise<PetEntity> {
        try {
            const list = await this.inFileDataBase.getFile();

            const pet = list.find(pet => pet.id === id);

            if(!pet) {
                throw new NotFoundError(`UserModel not found using ID ${id}`);
            }

            return PetModelMapper.toEntity(pet);
        } catch (error) {
            throw new NotFoundError(`Entity not found`);
        }
    }

    async insert(entity: PetEntity): Promise<void> {
        const list = await this.getValues();

        list.push(entity.toJSON());

        await this.inFileDataBase.editFile(list);
    }

    async findById(id: string): Promise<PetEntity> {
        return await this._get(id);
    }

    async findAll(): Promise<PetEntity[]> {
        const list = await this.getValues();
        const convert = list.map((pet)=> {
            return PetModelMapper.toEntity(pet);
        });

        return convert;
    }

    async update(entity: PetEntity): Promise<void> {
        const list = await this.getValues();
        const index = list.findIndex(pet => pet.id === entity.id);
        const entityJSON = entity.toJSON();


        list[index] = {
            ...entityJSON
        };

        await this.inFileDataBase.editFile(list);
    }

    async delete(id: string): Promise<void> {
        const list = await this.getValues();
        const _ = await this._get(id);
        const listUpdated = list.filter((pet) => pet.id !== id);

        await this.inFileDataBase.editFile(listUpdated);
    }
}