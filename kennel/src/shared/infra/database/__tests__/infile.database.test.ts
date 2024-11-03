import { PetEntity, PetProps } from "../../../../pets/domain/enitities/pet.entity";
import { PetDataBuilder } from "../../../../pets/domain/testing/helpers/pet-data-builder";
import { InFileDataBase } from "../infile.database";
import { readFile } from "fs/promises";

describe("Conection database", ()=>{
    let db: InFileDataBase;
    const listPets: PetProps[] = [
        PetDataBuilder({}),
        PetDataBuilder({}),
        PetDataBuilder({})
    ];

    beforeAll(async ()=> {
        db = new InFileDataBase<PetEntity>("./src/database/tests/data-test-infile.json");
        await db.resetFile();
    });

    it("Connecting the database", ()=> {
        expect(db).toBeDefined();
    });

    it("Insert values in database file", async ()=>{
        await db.editFile(listPets);

        const data = await readFile("./src/database/tests/data-test-infile.json", { encoding: "utf8" });
        const jsonData = JSON.parse(data) as { db: PetProps[]; };
        const NewListPets = listPets.map((pet) => {
            let { color, gender, image, race, updatedAt, createdAt } = pet;
            let create = createdAt?.toISOString();
            let update = updatedAt?.toISOString();

            return { color, gender, image, race, updatedAt: update, createdAt: create };
        });

        expect(jsonData.db).toEqual(NewListPets);
    });

    it("Get values in database file", async ()=>{
        const dataValues = await db.getFile();
        const NewListPets = listPets.map((pet) => {
            let { color, gender, image, race, updatedAt, createdAt } = pet;
            let create = createdAt?.toISOString();
            let update = updatedAt?.toISOString();

            return { color, gender, image, race, updatedAt: update, createdAt: create };
        });

        expect(dataValues).toEqual(NewListPets);
    });
});