import prisma from '../database/database';
import { IUser } from '../types/users';

export const create = async (data: IUser) => {
	const user = await prisma.users.create({ data: { ...data } });
	const level = await prisma.levels.findUnique({ where: { id: user.levelId } });
	return { user, level };
}

export const getById = async (id: number) => {
	return await prisma.users.findUnique({ where: { id } });
}

export const getByEmail = async (email: string) => {
	return await prisma.users.findUnique({ where: { email } });
}

export const getByNickname = async (nickname: string) => {
	return await prisma.users.findUnique({ where: { nickname } });
}

export const login = async (login: string) => {
	const byNick = await getByNickname(login);
	if(byNick) return byNick

	const byEmail = await getByEmail(login);
	if(byEmail) return byEmail;

	throw { code: 404, error: 'user not found' };
}

export const updateUserScore = async (userId: number, score: number) => {
}
