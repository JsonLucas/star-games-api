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

export type PurchaseData = { products: Array<string> } & Pick<IPurchase, 'userId' | 'payInformations'>;
