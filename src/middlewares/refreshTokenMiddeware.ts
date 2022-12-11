import { NextFunction, Request, Response } from "express";
import { Token } from "../utils/token";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { body } = req;
	if(body) throw { code: 403 };

	const { refreshToken } = body;
	const token = new Token();
	const verification = token.verificate(refreshToken, 'refresh');
	console.log(verification);
	
	res.locals.refreshToken = refreshToken;
	next();
}