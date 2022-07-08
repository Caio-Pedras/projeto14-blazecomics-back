import { Router } from 'express';
import { getItems, buyItems} from '../controllers/cartController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const cartRouter = Router();

cartRouter.post("/cart", getItems);
cartRouter.post("/buy" , validateToken, buyItems)

export default cartRouter;