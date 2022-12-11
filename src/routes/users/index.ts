import { Router } from 'express';
import { signInController, signUpController, userInformationController } from '../../controllers/usersControllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { signInMiddleware, signUpMiddleware } from '../../middlewares/usersMiddlewares';

const users = Router();
users.post('/sign-up', signUpMiddleware, signUpController);
users.post('/sign-in', signInMiddleware, signInController);
users.get('/user-info', authMiddleware, userInformationController);

export default users;