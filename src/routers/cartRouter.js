import { Router } from 'express';
import { getItems, buyItems} from '../controllers/cartController.js';
import { validateToken, jwtValidate } from '../middlewares/authMiddleware.js';

const cartRouter = Router();

cartRouter.post("/cart", getItems);
cartRouter.post("/buy" , jwtValidate, validateToken, buyItems)

export default cartRouter;