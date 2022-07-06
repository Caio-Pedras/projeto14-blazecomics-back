import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateUser, validateUserSignIn, validateUserSignUp } from '../middlewares/authMiddleware.js';


const authRouter = Router();

authRouter.post("/login",  validateUserSignIn, signIn);
authRouter.post("/signup", validateUser, validateUserSignUp, signUp);

export default authRouter;