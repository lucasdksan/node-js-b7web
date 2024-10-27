import { faker } from "@faker-js/faker";
import { PetProps } from "../../enitities/pet.entity";

type Props = {
    race?: string;
    gender?: "Masculino" | "Feminino";
    color?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export function PetDataBuilder(props: Props): PetProps {
    return {
        race: props.race ?? faker.animal.type(),
        gender: props.gender ?? "Feminino",
        color: props.color ?? faker.color.human(),
        createdAt: props.createdAt ?? new Date(),
        image: props.image ?? faker.image.url(),
        updatedAt: props.updatedAt ?? undefined,
    }
}