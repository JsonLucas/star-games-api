import prisma from "../database/database";
import { Level } from "../types/levels";

export const create = async (body: Level) => {
	const { name, totalPoints, features } = body;
	const jsonFeatures = JSON.stringify(features);
	return await prisma.levels.create({ data: { name, totalPoints, features: jsonFeatures } });
}

export const getById = async (id: number) => {
	return await prisma.levels.findUnique({ where: { id }});
}

export const getByName = async (name: string) => {
	return await prisma.levels.findUnique({ where:{ name } });
}
