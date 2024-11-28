import { RequestHandler } from "express";
import fs from "node:fs/promises";
import sharp from "sharp";
import { v4 } from "uuid";

export const upload: RequestHandler = async (req, res) => {
    if(req.file) {
        const newName = v4() + ".jpg";
        const file = await sharp(req.file.path)
            .resize(500, 500, {
                fit: "cover",
            })
            .greyscale()
            .toFormat("jpg")
            .toFile("./public/"+newName);

        await fs.unlink(req.file.path);
    } else {
        res.json({ error: "Deu ruim!" });
    }

    res.json({  });
}