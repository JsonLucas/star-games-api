import prisma from '../database/database';
import { Address, Card, IAddress, ICard, PurchaseData } from "../types/purchases";

type AddressVerification = Pick<IAddress, 'street' | 'number' | 'neighborhood' | 'city' | 'userId'>;

export const create = async (body: PurchaseData) => {
	console.log(body);
	//return await prisma.purchases.create({ data: { ...body } });
}

export const getUserPurchases = async (userId: number) => {
	return await prisma.purchases.findMany({ where: { userId } });
}

export const getById = async (id: number, userId: number) => {
	return await prisma.purchases.findFirst({ where: { id, userId } });
} 

export const verificateCardByUserId = async (userId: number, cardNumber: string) => {
	return await prisma.cards.findFirst({ where: { userId, number: cardNumber }});
}

export const verificateUserAddress = async (body: AddressVerification) => {
	return await prisma.addresses.findFirst({where: { ...body }});
}

export const createCard = async (body: Card) => {
	return await prisma.cards.create({ data: { ...body } });
}

export const createAddress = async (body: Address) => {
	return await prisma.addresses.create({ data: { ...body } });
}

export const getAddressesByUserId = async (userId: number) => {
	return await prisma.addresses.findMany({ where: { userId } });
}

export const getCardsByUserId = async (userId: number) => {
	return await prisma.cards.findMany({ where: { userId } });
}