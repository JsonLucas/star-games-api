import prisma from '../database/database';
import levelsServices from '../services/levels';
import { CreateUser, IUser } from '../types/users';

export const create = async (data: CreateUser) => {
	const user = await prisma.users.create({ data: { ...data } });
	const level = await prisma.levels.findUnique({ 
		where: { id: user.levelId }, 
		select: {
			id: true,
			name: true,
			totalPoints: true,
			features: true
		} 
	});
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
	const { totalScore, currentLevelPoints, levelId } = await getById(userId);
	const { totalPoints, id } = await levelsServices.getById(levelId);
	const updatedTotalPoints = totalScore + score;
	let update;
	if((score + currentLevelPoints) > totalPoints){
		update = { 
			totalScore: updatedTotalPoints,
			currentLevelPoints: ((score+currentLevelPoints) - totalPoints),
			levelId: id+1
		};
	}else{
		update = { 
			totalScore: updatedTotalPoints,
			currentLevelPoints: (score+currentLevelPoints)
		};
	}
	await prisma.users.update({
		where: { id: userId },
		data: {
			...update
		}
	});
}
