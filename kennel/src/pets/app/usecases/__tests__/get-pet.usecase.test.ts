import { GetPet } from "../get-pet.usecase";
import { PetOutputMapper } from "../../dtos/pet.dto";
import { InFileDataBase } from "../../../../shared/infra/database/infile.database";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetDB } from "../../../infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "../../../infra/database/in-file/repositories/pet-in-file.repository";
import { PetDataBuilder } from "../../../domain/testing/helpers/pet-data-builder";
import { PetEntity } from "../../../domain/enitities/pet.entity";

describe("GetPet Usecase test unit", ()=> {
    let sut: GetPet.UseCase;
    let inFileDb: InFileDataBase;
    let petRepo: PetRepository.Repository;

    beforeAll(()=>{
        inFileDb = new InFileDataBase<PetDB>("./src/database/tests/data-test-get-usecase.json");
        petRepo = new PetInFileRepository(inFileDb);
        sut = new GetPet.UseCase(petRepo);
    });

    it("Shoulda entity by ID", async ()=> {
        await inFileDb.resetFile();

        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        const spyFind = jest.spyOn(petRepo, "findById");

        await petRepo.insert(arrPet[0]);
        await petRepo.insert(arrPet[1]);

        const id = arrPet[1].toJSON().id;
        const result = await sut.execute({ id });
        const expectValue = PetOutputMapper.toOutput(arrPet[1]); 
        
        expect(result).toEqual(expectValue);
        expect(spyFind).toHaveBeenCalledTimes(1);
    });
});