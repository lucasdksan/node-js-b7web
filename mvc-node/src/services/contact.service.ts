import * as ContactModel from "../models/contact";

export const getServiceContacts = async ()=> {
    const list = await ContactModel.getContacts();

    return list;
}

export const createServiceContact = async (name: string) => {
    await ContactModel.createContact(name);
}

export const deleteServiceContact = async (name: string) => {
    await ContactModel.deleteContact(name);
}