import { CreatePet } from "@/pets/app/usecases/create-pet.usecase";
import { DeletePet } from "@/pets/app/usecases/delete-pet.usecase";
import { GetPet } from "@/pets/app/usecases/get-pet.usecase";
import { ListPet } from "@/pets/app/usecases/list-pet.usecase";
import { UpdatePet } from "@/pets/app/usecases/update-pet.usecase";
import { statusCode } from "@/shared/infra/config/statusCode";
import { Controller } from "@/shared/infra/controllers/controller";
import { RequestHandler } from "express";

export class PetController implements Controller {
    constructor(
        private readonly createUsecase: CreatePet.UseCase,
        private readonly deleteUsecase: DeletePet.UseCase,
        private readonly getUsecase: GetPet.UseCase,
        private readonly listUsecase: ListPet.UseCase,
        private readonly updateUsecase: UpdatePet.UseCase
    ){}
    public post: RequestHandler = async (req, res) => {
        try {
            const { color, gender, image, race } = req.body;
            const result = await this.createUsecase.execute({ color, gender, image, race });

            res.status(statusCode.CREATED).json({ result });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    };

    public get: RequestHandler = async (req, res) => {
        res.status(200).json({ message: "Get pet" });
    };

    public put: RequestHandler = async (req, res) => {
        res.status(200).json({ message: "Update pet" });
    };

    public delete: RequestHandler = async (req, res) => {
        res.status(204).end();
    };
}