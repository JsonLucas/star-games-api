import { NextFunction, Request, Response } from "express";
import { Token } from "../utils/token";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	if(body) throw { code: 403 };

	const token = new Token();
	const { payload } = token.verificate(body.refreshToken);
	
	res.locals.userId = payload;
	next();
}