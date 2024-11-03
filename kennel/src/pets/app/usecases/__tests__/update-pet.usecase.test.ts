import { UpdatePet } from "../update-pet.usecase";
import { PetOutputMapper } from "../../dtos/pet.dto";
import { InFileDataBase } from "../../../../shared/infra/database/infile.database";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetDB } from "../../../infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "../../../infra/database/in-file/repositories/pet-in-file.repository";
import { PetDataBuilder } from "../../../domain/testing/helpers/pet-data-builder";
import { PetEntity } from "../../../domain/enitities/pet.entity";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { BadRequestError } from "../../../../shared/app/errors/bad-request.error";

describe("UpdatePrt Usecase unit test", ()=>{
    let sut: UpdatePet.UseCase;
    let inFileDb: InFileDataBase;
    let petRepo: PetRepository.Repository;

    beforeAll(()=>{
        inFileDb = new InFileDataBase<PetDB>("./src/database/tests/data-test-update-usecase.json");
        petRepo = new PetInFileRepository(inFileDb);
        sut = new UpdatePet.UseCase(petRepo);
    });

    it("Shoulda update pet", async ()=>{
        await inFileDb.resetFile();

        const entity = new PetEntity(PetDataBuilder({}))
        const { id } = entity.toJSON();
        
        await petRepo.insert(entity);
        
        const output = await sut.execute({ id, color: "#123456" });
        const entityUpdate = await petRepo.findById(id);
        const mapperEntity = PetOutputMapper.toOutput(entityUpdate);

        expect(output.color).toEqual(mapperEntity.color);
    });

    it("Should throws error when entity not found", async ()=> {
        await expect(()=> sut.execute({ id: "fake", color: "#123" })).rejects.toThrow(
            new NotFoundError("Entity not found")
        );
    });

    it("Shoulda throws error when id not send", async ()=> {
        await expect(()=> sut.execute({ id: "", color: "#123" })).rejects.toThrow(
            new BadRequestError("Id not provided")
        );
    });
});