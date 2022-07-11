import { Router } from "express";
import  authRouter from "./authRouter.js";
import cartRouter from "./cartRouter.js";
import productRouter from "./productRouter.js";
import purchasesRouter from "./purchasesRouter.js";

const router = Router();
router.use(authRouter);
router.use(productRouter);
router.use(cartRouter)
router.use(purchasesRouter)
export default router;