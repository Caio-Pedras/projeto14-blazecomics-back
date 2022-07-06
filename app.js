import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());


app.listen(process.env.PORT);
