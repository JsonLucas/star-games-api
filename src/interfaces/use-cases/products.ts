import { IProducts, Product } from "../entities/products";

export interface IProductRepository {
  create: (body: Product) => Promise<void>;
  getProducts: () => Promise<Array<IProducts>> | null;
  getProductById: (id: number) => Promise<IProducts> | null;
  getProductByName: (name: string) => Promise<IProducts | null>;
  updateStock: (id: number, quantity: number) => Promise<void>;
}

export interface IProductServices {
  create: (body: Product) => Promise<void>;
  getProducts: () => Promise<Array<IProducts>>;
  getProductById: (id: number) => Promise<IProducts>;
  getProductByName: (name: string) => Promise<IProducts>;
  updateStock: (id: number, quantity: number) => Promise<void>;
}
