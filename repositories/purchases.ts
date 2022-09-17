import dayjs from "dayjs";
import usersServices from "../services/users";
import prisma from '../database/database';
import { IAddress, ICard, PurchaseData } from "../types/purchases";

type Card = Omit<ICard, '_id'>;
type Address = Omit<IAddress, '_id'>;
type AddressVerification = Pick<IAddress, 'street' | 'number' | 'neighborhood' | 'city' | 'userId'>;

export const create = async (body: PurchaseData) => {
}

export const getUserPurchases = async (userId: string) => {
}

export const getById = async (_id: string, userId: string) => {
} 

export const verificateCardByUserId = async (userId: string, cardNumber: string) => {
}

export const verificateUserAddress = async (body: AddressVerification) => {
}

export const createCard = async (body: Card) => {
}

export const createAddress = async (body: Address) => {
}

export const getAddressesByUserId = async (userId: string) => {
}

export const getCardsByUserId = async (userId: string) => {
}