import { Router } from 'express';
import getItems from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.post("/cart", getItems);

export default cartRouter;