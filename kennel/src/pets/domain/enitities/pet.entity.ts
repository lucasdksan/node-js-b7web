import { Entity } from "../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../shared/domain/errors/validation.error";
import { schema } from "./pet.schema";

export type PetProps = {
    race: string;
    gender: "Masculino" | "Feminino";
    color: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type PetPropsUpdate = {
    race?: string;
    gender?: "Masculino" | "Feminino";
    color?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class PetEntity extends Entity<PetProps> {
    constructor(public readonly props: PetProps, id?: string) {
        PetEntity.validate(props);
        super(props, id);
    }

    update(propsToUpdate: PetPropsUpdate): void {
        const updatedProps: PetProps = {
            ...this.props,
            ...propsToUpdate,
            updatedAt: new Date(),
        };

        PetEntity.validate(updatedProps);

        this.setProps(updatedProps);
    }

    private setProps(newProps: PetProps): void {
        (this as { props: PetProps }).props = newProps;
    }

    static validate(props: PetProps) {
        const result = schema.safeParse(props);

        if(!result.success) {
            throw new EntityValidationError(result.error);
        }
    }
}