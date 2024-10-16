import express from "express";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import router from "./routes";
import { notFoundRequest } from "./routes/errors/not_found.error";
import { errorHandler } from "./routes/errors/error_handler.error";

const app = express();

dotenv.config();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);
app.use(notFoundRequest);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("Server on in port 3000")
});