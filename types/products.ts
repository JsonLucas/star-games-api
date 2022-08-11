export interface IProducts {
    _id?: string
    name: string,
    description: string,
    price: number,
    shipping: number, //frete
    categoryId: string,
    stock: number,
    image: string
}