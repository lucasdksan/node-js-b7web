import { readFile, writeFile } from "fs/promises";
import { IContact } from "../shared/entity/i_contact";
import { CustomResponse, IService } from "../shared/services/i_service";
import { statusCode } from "../shared/utils/status_code";
import { generateId } from "../shared/utils/generate_id";

export class ContactService implements IService {
    constructor(private readonly dataSource: string) {  }

    private async getFile(): Promise<IContact[]> {
        const data = await readFile(this.dataSource, { encoding: "utf8" });
        const jsonData = JSON.parse(data) as { contacts: IContact[]; };
        
        return jsonData.contacts;
    }

    private async editFile(list: IContact[]) {
        const jsonData = JSON.stringify({ contacts: list});

        await writeFile(this.dataSource, jsonData);
    }

    private existContact(contact: IContact[], id: string): boolean {
        return contact.some((contact) => contact.id === id);
    }
    
    async create(value: string): Promise<CustomResponse> {
        let list: IContact[];

        if(!value || value.length < 2) {
            return {
                error: {
                    exist: true,
                    text: "Name Invalid"
                },
                status: statusCode.NOT_ACCEPTABLE,
                data: null,
            };
        }

        try {
            list = await this.getFile();
            
            list.push({ name: value, created_at: new Date(), updated_at: null, id: generateId() });
            
            await this.editFile(list);

            return {
                data: { contact: value },
                error: {
                    exist: false,
                    text: null,
                },
                status: statusCode.OK
            }
        } catch(err) {
            return {
                error: {
                    exist: true,
                    text: "Read File Error"
                },
                status: statusCode.INTERNAL_SERVER_ERROR,
                data: null,
            };;
        }
    }

    async list(): Promise<CustomResponse> {
        let list: IContact[];

        try {
            list = await this.getFile();
        } catch (error) {
            return {
                error: {
                    exist: true,
                    text: "Read File Error"
                },
                status: statusCode.INTERNAL_SERVER_ERROR,
                data: null,
            };
        }

        return {
            data: list,
            error: {
                exist: false,
                text:  null,
            },
            status: statusCode.OK
        };
    }

    async get(value: string): Promise<CustomResponse> {
        let list: IContact[];

        if(!value) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "you need to send a name to delete",
                },
                status: statusCode.NOT_ACCEPTABLE,
            };
        }

        try {
            list = await this.getFile();
            const contact = list.find((item)=> item.id === value);

            if(!this.existContact(list, value)) {
                return {
                    data: null,
                    error: {
                        exist: true,
                        text: "Contact Invalid",
                    },
                    status: statusCode.NOT_FOUND
                };
            }

            return {
                data: contact,
                error: {
                    exist: false,
                    text: null,
                },
                status: statusCode.OK
            }
        } catch (error) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "Read File Error",
                },
                status: statusCode.INTERNAL_SERVER_ERROR
            };
        }
    }

    async delete(value: string): Promise<CustomResponse> {
        let list: IContact[];

        if(!value) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "you need to send a name to delete",
                },
                status: statusCode.NOT_FOUND,
            };
        }

        try {
            list = await this.getFile();

            if(!this.existContact(list, value)) {
                return {
                    data: null,
                    error: {
                        exist: true,
                        text: "Contact Invalid",
                    },
                    status: statusCode.NOT_ACCEPTABLE
                };
            }
            
            const newList = list.filter((item)=> item.id !== value);

            await this.editFile(newList);

            return {
                data: null,
                error: {
                    exist: false,
                    text:  null,
                },
                status: statusCode.NO_CONTENT
            }
        } catch (error) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "Read File Error",
                },
                status: statusCode.INTERNAL_SERVER_ERROR
            };
        }
    }
    
    async update(id: string, value: string): Promise<CustomResponse> {
        let list: IContact[];

        if(!value || value.length < 2 || !id) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "Name or ID Invalid",
                },
                status: statusCode.NOT_ACCEPTABLE
            };
        }

        try {
            list = await this.getFile();

            if(!this.existContact(list, id)) {
                return {
                    data: null,
                    error: {
                        exist: true,
                        text: "Contact Invalid",
                    },
                    status: statusCode.NOT_FOUND
                };
            }
            
            list.forEach((contact)=> {
                if(contact.id === id) {
                    contact.name = value;
                    contact.updated_at = new Date();
                }
            });

            await this.editFile(list);

            return {
                data: null,
                error: {
                    exist: false,
                    text: null,
                },
                status: statusCode.NO_CONTENT
            }
        } catch (error) {
            return {
                data: null,
                error: {
                    exist: true,
                    text: "Read File Error",
                },
                status: statusCode.INTERNAL_SERVER_ERROR
            };
        }
    }
}