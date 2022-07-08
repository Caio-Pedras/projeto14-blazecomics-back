import { Router } from "express";
import  authRouter from "./authRouter.js";
import cartRouter from "./cartRouter.js";
import productRouter from "./productRouter.js";

const router = Router();
router.use(authRouter);
router.use(productRouter);
router.use(cartRouter);

export default router;