import { Request, Response } from "express";
import { Token } from "../utils/token";

export const refreshTokenController = (req: Request, res: Response) => {
	const { refreshToken } = res.locals;
	const token = new Token();
	const accessToken = token.generateAccessToken(refreshToken);
	res.status(200).send({ refreshToken, accessToken });
}