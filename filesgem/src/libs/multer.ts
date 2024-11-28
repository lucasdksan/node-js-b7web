import multer from "multer";

export const diskStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const prefix = Math.floor(Math.random() * 9999) + "-file-";
        cb(null, prefix);
    },

    destination: (req, file, cb) => {
        cb(null, "./public");
    }
});

export const _upload = multer({
    storage: diskStorage
});