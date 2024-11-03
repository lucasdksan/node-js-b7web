import { InFileDataBase } from "../../../../shared/infra/database/infile.database";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetDB } from "../../../infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "../../../infra/database/in-file/repositories/pet-in-file.repository";
import { CreatePet } from "../create-pet.usecase";

describe("CreatePet Usecase unit test", ()=>{
    let sut: CreatePet.UseCase;
    let inFileDb: InFileDataBase;
    let petRepo: PetRepository.Repository;

    beforeAll(async ()=>{
        inFileDb = new InFileDataBase<PetDB>("./src/database/tests/data-test-create-usecase.json");
        petRepo = new PetInFileRepository(inFileDb);
        sut = new CreatePet.UseCase(petRepo);

        await inFileDb.resetFile();
    });

    it("Shoulda create pet in db", async ()=> {
        await inFileDb.resetFile();

        const spyInsert = jest.spyOn(petRepo, "insert");
        const result = await sut.execute({
            color: "red",
            gender: "Feminino",
            image: "dasda",
            race: "Viralata"
        });

        expect(result.id).toBeDefined();
        expect(spyInsert).toHaveBeenCalledTimes(1);
    });
}); 