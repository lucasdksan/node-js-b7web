import { InFileDataBase } from "@/shared/infra/database/infile.database";
import { PetInFileRepository } from "../pet-in-file.repository";
import { PetDB } from "../../dtos/pet-in-file.dto";
import { PetEntity } from "@/pets/domain/enitities/pet.entity";
import { PetDataBuilder } from "@/pets/domain/testing/helpers/pet-data-builder";
import { readFile } from "fs/promises";

describe("Pet In File Repository unit test", ()=>{
    let db: InFileDataBase;
    let sut: PetInFileRepository;
    let pet: PetEntity;

    beforeAll(()=>{
        const props = PetDataBuilder({});
        db = new InFileDataBase<PetDB>("./src/database/data.json");
        sut = new PetInFileRepository(db);
        pet = new PetEntity(props);
    });

    it("Connection db file and pet repository created", ()=> {
        expect(db).toBeDefined();
        expect(sut).toBeDefined();
    });

    it("Shoulda Insert pet", async ()=> {
        await sut.insert(pet);
        const PEntity = {
            ...pet.toJSON(),
            createdAt: pet.toJSON().createdAt.toISOString()
        };
        const data = await readFile("./src/database/data.json", { encoding: "utf8" });
        const jsonData = JSON.parse(data) as { db: PetDB[]; };
        const dataFind = jsonData.db.find(e => e.id === PEntity.id);

        expect(dataFind).toEqual(PEntity);
    });

    it("Shoulda find pet by id", async ()=> {
        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        const id = arrPet[0].id;

        arrPet.forEach(async (pet)=> {
            await sut.insert(pet);
        });

        const dataPet = await sut.findById(id);

        expect(dataPet).toEqual(arrPet[0].toJSON());
    });
});