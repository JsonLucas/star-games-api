import { Request, Response, NextFunction } from "express";
import { UserServices } from "../services/users";
import { UserRepository } from "../repositories/users";
import { Validator } from "../utils/validator";
import { signInSchema, signUpSchema } from "../utils/schemas";

export const userExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = res.locals;
}

export const signUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
	const validator = new Validator();
	await validator.validate(body, signUpSchema);
    next();
}

export const signInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
	const validator = new Validator();
	await validator.validate(body, signInSchema);

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
