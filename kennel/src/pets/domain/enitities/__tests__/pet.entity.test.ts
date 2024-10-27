import { PetDataBuilder } from "../../testing/helpers/pet-data-builder";
import { PetEntity, PetProps } from "../pet.entity";

describe("Pet Entity unit test", ()=>{
    let props: PetProps;
    let sut: PetEntity;

    beforeAll(()=>{
        PetEntity.validate = jest.fn();
        props = PetDataBuilder({});

        sut = new PetEntity(props);
    });

    it("Contructor Method", ()=>{
        expect(PetEntity.validate).toHaveBeenCalled();
        expect(sut.props.color).toEqual(props.color);
        expect(sut.props.gender).toEqual(props.gender);
        expect(sut.props.image).toEqual(props.image);
        expect(sut.props.race).toEqual(props.race);
        expect(sut.props.updatedAt).toBeUndefined();
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });

    
});