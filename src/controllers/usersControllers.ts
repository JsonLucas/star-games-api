import { tokenGeneration } from "../utils/token";
import { decrypt, encrypt } from "../utils/encrypt";
import { Request, Response } from "express";
import { UserServices } from "../services/users";
import { UserRepository } from "../repositories/users";
import { LevelServices } from "../services/levels";
import { LevelRepository } from "../repositories/levels";

export const signUpController = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, nickname, cpf, email, password, phone } = body;
    const encryptedPassword = encrypt(password);
	const userServices = new UserServices(new UserRepository()); 
    const createUser = await userServices.create({
		name, 
		nickname, 
		cpf, 
		email, 
		password: encryptedPassword, 
		phone
	});
    
    const { user, level } = createUser;
    const token = tokenGeneration(user.id.toString());
    res.status(201).send({ token, level });
}

export const signInController = async (req: Request, res: Response) => {
    const { data } = res.locals;
    const { userId, password, hashPassword, levelId, totalScore } = data;
    const comparation = decrypt(password, hashPassword);
    if(!comparation) throw { code: 401, error: 'incorrect credentials' };

	const levelServices = new LevelServices(new LevelRepository());
    const token = tokenGeneration(userId);
    const level = await levelServices.getById(levelId);
    if(!level) throw { code: 500 };
	
    const { totalPoints, name, features, id } = level;
    const levelData = { totalPoints, name, totalScore, features, id };
    res.status(200).send({ token, level: levelData });
}
