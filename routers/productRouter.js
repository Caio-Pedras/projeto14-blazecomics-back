import { Router } from "express";
import { getProducts } from "../controllers/productControllers.js";

const productRouter = Router();

productRouter.get("/products", getProducts);
