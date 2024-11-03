import express, { Router } from "express";
import { PetController } from "../pets/infra/controllers/pet.controller";
import { EnvConfig } from "../shared/infra/config/env/env.config";
import { PetDB } from "../pets/infra/database/in-file/dtos/pet-in-file.dto";
import { InFileDataBase } from "../shared/infra/database/infile.database";
import { PetInFileRepository } from "../pets/infra/database/in-file/repositories/pet-in-file.repository";
import { CreatePet } from "../pets/app/usecases/create-pet.usecase";
import { DeletePet } from "../pets/app/usecases/delete-pet.usecase";
import { GetPet } from "../pets/app/usecases/get-pet.usecase";
import { ListPet } from "../pets/app/usecases/list-pet.usecase";
import { UpdatePet } from "../pets/app/usecases/update-pet.usecase";

export class Routes {
    private readonly _router: Router;
    private _controller: PetController;

    constructor(public readonly envConfig: EnvConfig ) {
        this._router = express.Router();

        const inFileDb = new InFileDataBase<PetDB>(this.envConfig.getDB());
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
        this._router.post("/pets", this.controller.post);
        this._router.get("/pets/list", this.controller.list);
        this._router.get("/pets/:id", this.controller.get);
        this._router.delete("/pets/:id", this.controller.delete);
        this._router.put("/pets/:id", this._controller.put);
    }

    get router():Router {
        return this._router;
    }

    get controller(): PetController {
        return this._controller;
    }
}