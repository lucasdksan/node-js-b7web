import { PetInFileRepository } from "../pet-in-file.repository";
import { PetDB } from "../../dtos/pet-in-file.dto";
import { readFile } from "fs/promises";
import { InFileDataBase } from "../../../../../../shared/infra/database/infile.database";
import { PetEntity } from "../../../../../domain/enitities/pet.entity";
import { PetDataBuilder } from "../../../../../domain/testing/helpers/pet-data-builder";

describe("Pet In File Repository unit test", ()=>{
    let db: InFileDataBase;
    let sut: PetInFileRepository;
    let pet: PetEntity;

    beforeAll(async ()=>{
        const props = PetDataBuilder({});
        db = new InFileDataBase<PetDB>("./src/database/tests/data-test-pet-in-file.json");
        sut = new PetInFileRepository(db);
        pet = new PetEntity(props);

        
        await db.resetFile();
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
        const data = await readFile("./src/database/tests/data-test-pet-in-file.json", { encoding: "utf8" });
        const jsonData = JSON.parse(data) as { db: PetDB[]; };
        const dataFind = jsonData.db.find(e => e.id === PEntity.id);

        expect(dataFind).toEqual(PEntity);
    });

    it("Shoulda find pet by id", async ()=> {
        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        const id = arrPet[0].id;

        await sut.insert(arrPet[0]);
        await sut.insert(arrPet[1]);

        const dataPet = await sut.findById(id);

        expect(dataPet.toJSON()).toEqual(arrPet[0].toJSON());
    });

    it("Shoulda find all pets", async ()=> {
        await db.resetFile();

        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        await sut.insert(arrPet[0]);
        await sut.insert(arrPet[1]);
        await sut.insert(arrPet[2]);
        await sut.insert(arrPet[3]);

        const list = await sut.findAll();

        expect(list.length).toStrictEqual(arrPet.length);
        expect(list).toEqual(arrPet);
    });
    
    it("Shoulda update a pet entity", async ()=> {
        await db.resetFile();

        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        await sut.insert(arrPet[0]);
        await sut.insert(arrPet[1]);

        arrPet[0].update({ color: "red",  race: "Uiiiii" });

        await sut.update(arrPet[0]);

        const entity = await sut.findById(arrPet[0].id);

        expect(entity.toJSON().color).toEqual("red");
        expect(entity.toJSON().race).toEqual("Uiiiii");
    });

    it("Shoulda delete a pet entity", async ()=> {
        await db.resetFile();

        const arrPet = [
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
            new PetEntity(PetDataBuilder({})),
        ];

        const id = arrPet[2].toJSON().id;

        await sut.insert(arrPet[0]);
        await sut.insert(arrPet[1]);
        await sut.insert(arrPet[2]);
        await sut.insert(arrPet[3]);

        const newArr = [
            arrPet[0],
            arrPet[1],
            arrPet[3]
        ];

        await sut.delete(id);

        const list = await sut.findAll();

        expect(list).toEqual(newArr);
    });
});