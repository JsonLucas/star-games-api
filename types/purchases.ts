export interface IPurchase {
    _id?: string,
    userId: string,
    productId: string,
    createdAt?: Date,
    status?: string,
    payInformations: {
        method: string,
        cardId?: string
    }
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

export type Card = Omit<ICard, '_id' | 'userId'>;
export type Address = Omit<IAddress, '_id' | 'userId'>;
export type PurchaseData = { products: Array<string> } & Pick<IPurchase, 'userId' | 'payInformations'>;
