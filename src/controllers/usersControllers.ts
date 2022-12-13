import { Request, Response } from "express";
import { UserServices } from "../services/users";
import { UserRepository } from "../repositories/users";
import { LevelServices } from "../services/levels";
import { LevelRepository } from "../repositories/levels";
import { Crypt } from "../utils/encrypt";
import { Token } from "../utils/token";

export const signUpController = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, nickname, cpf, email, password, phone } = body;
	const crypt = new Crypt();
    const encryptedPassword = crypt.encrypt(password);
	const userServices = new UserServices(new UserRepository()); 
    const createUser = await userServices.create({
		name, 
		nickname, 
		cpf, 
		email, 
		password: encryptedPassword, 
		phone
	});
    
    const { id } = createUser;
	const token = new Token();
    const refreshToken = token.generateRefreshToken(id);
	const accessToken = token.generateAccessToken(refreshToken);
    res.status(201).send({ refreshToken, accessToken });
}

export const signInController = async (req: Request, res: Response) => {
    const { data } = res.locals;
    const { userId, password, hashPassword, levelId, totalScore } = data;
	const crypt = new Crypt();
    const comparation = crypt.compare(password, hashPassword);
    if(!comparation) throw { code: 401, error: 'incorrect credentials' };

	const levelServices = new LevelServices(new LevelRepository());
	const token = new Token();
    const refreshToken = token.generateRefreshToken(userId);
	const accessToken = token.generateAccessToken(refreshToken);
    const level = await levelServices.getById(levelId);
    if(!level) throw { code: 500 };
	
    const { totalPoints, name, features, id } = level;
    const levelData = { totalPoints, name, totalScore, features, id };
    res.status(200).send({ refreshToken, accessToken, level: levelData });
}

export const userInformationController = async (req: Request, res: Response) => {
	const { userId } = res.locals;
	const userServices = new UserServices(new UserRepository());
	const userInformation = await userServices.getInformation(userId);
	res.status(200).send(userInformation);
}