import { IProducts } from "./products"

export interface IPurchase {
    id?: number,
	userId: number,
    productId: number,
    quantity: number,
    status?: string,
	createdAt?: Date,
	updatedAt?: Date
}

export interface ICard {
    id?: number,
    name: string,
    number: string,
    cvv: number,
    expirationDate: Date,
    userId: number,
	createdAt?: Date,
	updatedAt?: Date
}

interface products {
    productId: string,
    quantity: number,
	updatedStock: number
}

export type Card = Omit<ICard, 'id' | 'createdAt' | 'updatedAt'>;
