export interface IPurchase {
    id?: number,
    userData: {
        userId: number,
        addressId: number,
        payInformations: {
            method: string,
            cardId?: string,
        }
    },
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

export interface IAddress {
    id: number,
	street: string,
    number: number,
    city: string,
    state: string,
    neighborhood: string,
    complement?: string,
    cep: string,
    userId: number,
	createdAt?: Date,
	updatedAt?: Date
}

interface products {
    productId: string,
    quantity: number
}

export type Card = Omit<ICard, 'id' | 'createdAt' | 'updatedAt'>;
export type Address = Omit<IAddress, 'id' | 'createdAt' | 'updatedAt'>;
export type PurchaseData = {
    scorePoints: number,
    products: Array<products>
} & Pick<IPurchase, 'userData'>;
