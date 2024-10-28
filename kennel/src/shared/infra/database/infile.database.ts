import { readFile, writeFile } from "fs/promises";


export class InFileDataBase<P = any> {
    constructor(private readonly dataSource: string) {  }

    protected async getFile(): Promise<P[]> {
        const data = await readFile(this.dataSource, { encoding: "utf8" });
        const jsonData = JSON.parse(data) as { db: P[]; };
        
        return jsonData.db;
    }

    protected async editFile(list: P[]) {
        const jsonData = JSON.stringify({ contacts: list});

        await writeFile(this.dataSource, jsonData);
    }
}