import express from "express";
import helmet from "helmet";
import routes from "./router/routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, ()=>{
    console.log("Server on in port 3000")
});