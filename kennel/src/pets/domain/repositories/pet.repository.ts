import { PetEntity } from '../enitities/pet.entity';
import { RepositoryInterface } from './../../../shared/domain/repositories/repository.interface';

export namespace PetRepository {
    export interface Repository extends RepositoryInterface<PetEntity>{}
}