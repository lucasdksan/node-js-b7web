import { readFile, writeFile } from "fs/promises";

export class InFileDataBase<P = any> {
    constructor(private readonly dataSource: string) {  }

    public async resetFile(): Promise<void> {
        await this.editFile([]);
    }

    public async getFile(): Promise<P[]> {
        const data = await readFile(this.dataSource, { encoding: "utf8" });
        const jsonData = JSON.parse(data);
        
        return jsonData.db;
    }

    public async editFile(list: P[]) {
        const jsonData = JSON.stringify({ db: list});

        await writeFile(this.dataSource, jsonData);
    }
}