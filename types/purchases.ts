export interface IPurchase {
    _id?: string,
    userData: {
        userId: string,
        addressId: string,
        payInformations: {
            method: string,
            cardId?: string,
        }
    },
    productId: string,
    quantity: number
    createdAt?: Date,
    status?: string
}

export interface ICard {
    _id?: string,
    name: string,
    number: string,
    cvv: string | number,
    expirationDate: Date,
    userId?: string
}

export interface IAddress {
    _id: string,
    street: string,
    number: number,
    city: string,
    state: string,
    neighborhood: string,
    complement?: string,
    cep: string,
    userId?: string
}

interface products {
    productId: string,
    quantity: number
}

export type Card = Omit<ICard, '_id' | 'userId'>;
export type Address = Omit<IAddress, '_id' | 'userId'>;
export type PurchaseData = {
    scorePoints: number,
    products: Array<products>
} & Pick<IPurchase, 'userData'>;
