import prisma from "../database/database";
import { Product } from "../interfaces/products";

export const create = async (body: Product) => {
	return await prisma.products.create({ data: { ...body } });
}

export const getProducts = async () => {
	return await prisma.products.findMany();
}

export const getProductById = async (id: number) => {
	return await prisma.products.findUnique({ where: { id } });
}

export const updateStock = async (id: number, quantity: number) => {
	return await prisma.products.update({ where: { id }, data: { stock: quantity } });
}