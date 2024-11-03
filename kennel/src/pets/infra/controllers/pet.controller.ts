import { RequestHandler } from "express";
import { Controller } from "../../../shared/infra/controllers/controller";
import { CreatePet } from "../../app/usecases/create-pet.usecase";
import { DeletePet } from "../../app/usecases/delete-pet.usecase";
import { GetPet } from "../../app/usecases/get-pet.usecase";
import { ListPet } from "../../app/usecases/list-pet.usecase";
import { UpdatePet } from "../../app/usecases/update-pet.usecase";
import { statusCode } from "../../../shared/infra/config/statusCode";

export class PetController implements Controller {
    constructor(
        private readonly createUsecase: CreatePet.UseCase,
        private readonly deleteUsecase: DeletePet.UseCase,
        private readonly getUsecase: GetPet.UseCase,
        private readonly listUsecase: ListPet.UseCase,
        private readonly updateUsecase: UpdatePet.UseCase
    ){}

    public list: RequestHandler = async (req, res) => {
        try {
            const result = await this.listUsecase.execute();

            res.status(statusCode.OK).json({ result });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    }
    
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
        try {
            const { id } = req.params;
            const result = await this.getUsecase.execute({ id });

            res.status(statusCode.OK).json({ result });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    };

    public put: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const result = await this.updateUsecase.execute({ id, ...body });

            res.status(statusCode.OK).json({ result });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    };

    public delete: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const result = this.deleteUsecase.execute({ id });

            res.status(statusCode.OK).json({ result });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    };
}