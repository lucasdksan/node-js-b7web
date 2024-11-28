import express from "express";
import productRouter from "./product.route";
import userRouter from "./user.route";
import multer from "multer";
import sharp from "sharp";

const router = express.Router();
const upload = multer({
    dest: "uploads"
});

router.post("/contato", upload.single("photo"), async (req, res)=>{
    const { file } = req;


    await sharp(file?.path).resize(300, 300, {
        fit: "cover",
    }).toFile("public/avatars/"+file?.filename + ".jpg");
    console.log(file);
});
router.use("/products",productRouter);
router.use("/users", userRouter);

export default router;