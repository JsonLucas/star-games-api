import { Request, Response, NextFunction } from 'express';
import { Token } from '../utils/token';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(!authorization) throw { code: 401 };

	const auth = authorization.split(' ');
	if(auth[0] !== 'Bearer') throw { code: 401, error: 'invalid access token.' };

	const token = new Token();
    const { userId } = token.verificate(auth[1], 'access');

    if(!userId) throw { code: 403 };
    res.locals.userId = Number(userId);
    next();
}

export default authMiddleware;