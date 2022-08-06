import { Router } from 'express';
import { signInController, signUpController } from '../../controllers/usersControllers';
import { signInMiddleware, signUpMiddleware } from '../../middlewares/usersMiddlewares';

const users = Router();
users.post('/sign-up', signUpMiddleware, signUpController);
users.post('/sign-in', signInMiddleware, signInController);

export default users;