import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/users';
import { UserServices } from '../services/users';
import { tokenVerification } from '../utils/token';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(!authorization) throw { code: 401 };
    const userId = tokenVerification(authorization);

    if(!userId) throw { code: 400 };
	const userServices = new UserServices(new UserRepository());
    const user = await userServices.getById(Number(userId));

	if(!user) throw { code: 404, error: 'user not found.' };
    res.locals.userId = Number(userId);
    next();
}

export default authMiddleware;