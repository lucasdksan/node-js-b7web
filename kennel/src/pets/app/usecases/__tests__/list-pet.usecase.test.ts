import { InFileDataBase } from "@/shared/infra/database/infile.database";
import { ListPet } from "../list-pet.usecase";
import { PetRepository } from "@/pets/domain/repositories/pet.repository";
import { PetDB } from "@/pets/infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "@/pets/infra/database/in-file/repositories/pet-in-file.repository";
import { PetEntity } from "@/pets/domain/enitities/pet.entity";
import { PetDataBuilder } from "@/pets/domain/testing/helpers/pet-data-builder";
import { PetOutputMapper } from "../../dtos/pet.dto";

describe("ListPet Usecase unit test", ()=> {
    let sut: ListPet.UseCase;
    let inFileDb: InFileDataBase;
    let petRepo: PetRepository.Repository;

    beforeAll(()=>{
        inFileDb = new InFileDataBase<PetDB>("./src/database/tests/data-test-list-usecase.json");
        petRepo = new PetInFileRepository(inFileDb);
        sut = new ListPet.UseCase(petRepo);
    });

    it("Shoulda all pets in file database", async ()=>{
        await inFileDb.resetFile();

        const spyFindAll = jest.spyOn(petRepo, "findAll");
        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        await petRepo.insert(arrPet[0]);
        await petRepo.insert(arrPet[1]);
    
        const result = await sut.execute();
        const values = arrPet.map(entity => {
            return PetOutputMapper.toOutput(entity);
        });

        expect(result).toEqual(values);
        expect(spyFindAll).toHaveBeenCalledTimes(1);
    });
});