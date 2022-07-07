import { Router } from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productControllers.js";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:productId", getProductById);

export default productRouter;
