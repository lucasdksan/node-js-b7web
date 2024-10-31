import { CreatePet } from "@/pets/app/usecases/create-pet.usecase";
import { DeletePet } from "@/pets/app/usecases/delete-pet.usecase";
import { GetPet } from "@/pets/app/usecases/get-pet.usecase";
import { ListPet } from "@/pets/app/usecases/list-pet.usecase";
import { UpdatePet } from "@/pets/app/usecases/update-pet.usecase";
import { PetController } from "@/pets/infra/controllers/pet.controller";
import { PetDB } from "@/pets/infra/database/in-file/dtos/pet-in-file.dto";
import { PetInFileRepository } from "@/pets/infra/database/in-file/repositories/pet-in-file.repository";
import { EnvConfig } from "@/shared/infra/config/env/env.config";
import { InFileDataBase } from "@/shared/infra/database/infile.database";
import express, { Router } from "express";

export class Routes {
    private _router: Router;
    private _controller: PetController;

    constructor(public readonly envConfig: EnvConfig ) {
        this._router = express.Router();

        const inFileDb = new InFileDataBase<PetDB>("./src/database/data.json");
        const petRepo = new PetInFileRepository(inFileDb);
        const createUsecase = new CreatePet.UseCase(petRepo);
        const deleteUsecase = new DeletePet.UseCase(petRepo);
        const getUsecase = new GetPet.UseCase(petRepo);
        const listUsecase = new ListPet.UseCase(petRepo);
        const updateUsecase = new UpdatePet.UseCase(petRepo);

        this._controller = new PetController(
            createUsecase,
            deleteUsecase,
            getUsecase,
            listUsecase,
            updateUsecase
        );
    }

    execute() {
        this._router.post("/pets", this._controller.post);
    }

    get router():Router {
        return this._router;
    }
}