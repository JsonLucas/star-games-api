export interface IProducts {
    id?: number
    name: string,
    description: string,
    price: number,
    shipping: number, //frete
    categoryId: number,
    stock: number,
    image: string,
    createdAt?: Date
	updatedAt?: Date
}

export interface ICategory{
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IFavorites {
  id: number,
  userId: number,
  productId: number,
  createdAt?: Date,
  updatedAt?: Date
}

export type Product = Omit<IProducts, 'id' | 'createdAt' | 'updatedAt'>;
export type FullProduct = IProducts & { favorite?: boolean };