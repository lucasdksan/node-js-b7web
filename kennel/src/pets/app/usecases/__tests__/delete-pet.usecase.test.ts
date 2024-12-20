import { InFileDataBase } from "../../../../shared/infra/database/infile.database";
import { PetEntity } from "../../../domain/enitities/pet.entity";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetDataBuilder } from "../../../domain/testing/helpers/pet-data-builder";
import { PetDB } from "../../../infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "../../../infra/database/in-file/repositories/pet-in-file.repository";
import { DeletePet } from "../delete-pet.usecase";

describe("DeletePet Usecase unit test", ()=> {
    let sut: DeletePet.UseCase;
    let inFileDb: InFileDataBase;
    let petRepo: PetRepository.Repository;

    beforeAll(()=>{
        inFileDb = new InFileDataBase<PetDB>("./src/database/tests/data-test-delete-usecase.json");
        petRepo = new PetInFileRepository(inFileDb);
        sut = new DeletePet.UseCase(petRepo);
    });

    it("Delete Entity in table", async ()=> {
        await inFileDb.resetFile();

        const spyDelete = jest.spyOn(petRepo, "delete");
        const entity = new PetEntity(PetDataBuilder({}));
        
        await petRepo.insert(entity);
        await sut.execute({ id: entity.toJSON().id });

        const len = await inFileDb.getFile()

        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(len).toHaveLength(0);
    });
});