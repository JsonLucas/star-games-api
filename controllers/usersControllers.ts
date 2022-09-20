import { tokenGeneration } from "../utils/token";
import { decrypt, encrypt } from "../utils/encrypt";
import { Request, Response } from "express";
import usersServices from "../services/users";
import levelsServices from "../services/levels";

export const signUpController = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, nickname, cpf, email, password, phone } = body;
    const encryptedPassword = encrypt(password);
    const createUser = await usersServices.create({
		name, 
		nickname, 
		cpf, 
		email, 
		password: encryptedPassword, 
		phone, 
		levelId: 1, 
		totalScore: 0,
		currentLevelPoints: 0
	});
    
    if(!createUser) throw { code: 500 };
    const { user, level } = createUser;
    const token = tokenGeneration(user.id.toString());
    res.status(201).send({ token, level });
}

export const signInController = async (req: Request, res: Response) => {
    const { data } = res.locals;
    const { userId, password, hashPassword, levelId, totalScore } = data;
    const comparation = decrypt(password, hashPassword);
    if(!comparation) throw { code: 401, error: 'incorrect credentials' };

    const token = tokenGeneration(userId);
    const level = await levelsServices.getById(levelId);
    if(!level) throw { code: 500 };
	
    const { totalPoints, name, features } = level;
    const levelData = { totalPoints, name, totalScore, features };
    res.status(200).send({ token, levelData });
}
