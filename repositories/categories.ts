import prisma from "../database/database";

export const create = async (name: string) => {
	return await prisma.categories.create({ data: { name } });
}

export const getAll = async () => {
	return await prisma.categories.findMany();
}

export const getById = async (id: number) => {
	return await prisma.categories.findUnique({ where: { id } });
}

export const getByName = async (name: string) => {
	return await prisma.categories.findUnique({ where: { name } });
}