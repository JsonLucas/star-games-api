import { validateSignIn, validateSignUp } from "../utils/validations/functions";
import { Request, Response, NextFunction } from "express";
import { UserServices } from "../services/users";
import { UserRepository } from "../repositories/users";

export const userExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = res.locals;
}

export const signUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    validateSignUp(body);

	const userServices = new UserServices(new UserRepository());
    const user = await userServices.getByEmail(body.email);
    if(user) throw { code: 409, error: 'this user already exists' };

    next();
}

export const signInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    validateSignIn(body);

	const userServices = new UserServices(new UserRepository());
    const user = await userServices.login(body.login);
    if(!user) throw { code: 404, error: 'incorrect credentials' };
	
    res.locals.data = { 
        userId: user.id, 
        hashPassword: user.password, 
        password: body.password, 
        levelId: user.levelId,
        totalScore: user.currentLevelPoints
    };
    next();
}
