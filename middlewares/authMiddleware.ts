import { Request, Response, NextFunction } from 'express';
import usersServices from '../services/users';
import { tokenVerification } from '../utils/token';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(!authorization) throw { code: 401 };
    const userId = tokenVerification(authorization);

    if(!userId) throw { code: 400 };
    const user = await usersServices.getById(userId.toString());
    console.log(user);
    res.locals.userId = userId;
    next();
}

export default authMiddleware;