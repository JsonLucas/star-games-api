import usersServices from "../services/users";
import { tokenGeneration } from "../utils/token";
import { decrypt, encrypt } from "../utils/encrypt";
import { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, nickname, cpf, email, password, phone } = body;
    const encryptedPassword = encrypt(password);
    const user = await usersServices.create({name, nickname, cpf, email, password: encryptedPassword, phone});
    
    if(!user) throw { code: 500 };
    const { id, level } = user;
    const token = tokenGeneration(id);
    res.status(201).send({ token, level });
}

export const signInController = async (req: Request, res: Response) => {
    const { data } = res.locals;
    const { userId, password, hashPassword, levelId, totalScore } = data;
    const comparation = decrypt(password, hashPassword);
    if(!comparation) throw { code: 401, error: 'incorrect credentials' };

    const token = tokenGeneration(userId);
    const level = await usersServices.getLevelById(levelId);
    if(!level) throw { code: 500 };
    const { totalPoints, name, levelNumber, features } = level;
    const levelData = { totalPoints, name, levelNumber, totalScore, features };
    console.log(data, levelData);
    res.status(200).send({ token, levelData });
}
