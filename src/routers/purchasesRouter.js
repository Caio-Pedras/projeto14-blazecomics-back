import { Router } from 'express';
import { getPurchases } from '../controllers/purchasesController.js';
const purchasesRouter = Router();
import { validateToken, jwtValidate } from '../middlewares/authMiddleware.js';

purchasesRouter.get("/purchases", jwtValidate, validateToken, getPurchases);

export default purchasesRouter;