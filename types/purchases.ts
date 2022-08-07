export interface IPurchase {
    _id?: string,
    userId: string,
    productId: number,
    createdAt?: Date,
    status?: string
}
