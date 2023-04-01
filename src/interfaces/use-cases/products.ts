import { IFavorites, IProducts, Product } from "../entities/products";

export interface IProductRepository {
  create: (body: Product) => Promise<void>;
  getProducts: () => Promise<Array<IProducts>> | null;
  getProductById: (id: number) => Promise<IProducts> | null;
  getProductByName: (name: string) => Promise<IProducts | null>;
  updateStock: (id: number, quantity: number) => Promise<void>;
  createFavorite: (productId: number, userId: number) => Promise<boolean>;
  getUserFavorites: (userId: number) => Promise<Array<IFavorites> | null>;
}

export interface IProductServices {
  create: (body: Product) => Promise<void>;
  getProducts: (userId?: number) => Promise<Array<IProducts>>;
  getProductById: (id: number) => Promise<IProducts>;
  getProductByName: (name: string) => Promise<IProducts>;
  updateStock: (id: number, quantity: number) => Promise<void>;
  createFavorite: (productId: number, userId: number) => Promise<boolean>;
  getUserFavorites: (userId: number) => Promise<Array<IProducts>>;
}
