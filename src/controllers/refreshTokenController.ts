import { Request, Response } from "express";
import { Token } from "../utils/token";

export const refreshTokenController = (req: Request, res: Response) => {
	const { refreshToken } = res.locals;
	console.log(refreshToken);
	const token = new Token();
	res.sendStatus(200);
}