import { ListPet } from "../list-pet.usecase";
import { PetOutputMapper } from "../../dtos/pet.dto";
import { InFileDataBase } from "../../../../shared/infra/database/infile.database";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetDB } from "../../../infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "../../../infra/database/in-file/repositories/pet-in-file.repository";
import { PetDataBuilder } from "../../../domain/testing/helpers/pet-data-builder";
import { PetEntity } from "../../../domain/enitities/pet.entity";

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