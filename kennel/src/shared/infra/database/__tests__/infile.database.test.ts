import { PetEntity, PetProps } from "@/pets/domain/enitities/pet.entity";
import { InFileDataBase } from "../infile.database";
import { PetDataBuilder } from "@/pets/domain/testing/helpers/pet-data-builder";
import { readFile } from "fs/promises";

describe("Conection database", ()=>{
    let db: InFileDataBase;
    const listPets: PetProps[] = [
        PetDataBuilder({}),
        PetDataBuilder({}),
        PetDataBuilder({})
    ];

    beforeAll(()=> {
        db = new InFileDataBase<PetEntity>("./src/database/data.json");
    });

    it("Connecting the database", ()=> {
        expect(db).toBeDefined();
    });

    it("Insert values in database file", async ()=>{
        await db.editFile(listPets);

        const data = await readFile("./src/database/data.json", { encoding: "utf8" });
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