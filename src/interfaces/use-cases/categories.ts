import { ICategory } from "../entities/products";

export interface ICategoryRepository {
  create: (name: string) => Promise<void> | null;
  getAll: () => Promise<Array<ICategory>> | null;
  getById: (id: number) => Promise<ICategory> | null;
  getByName: (name: string) => Promise<ICategory> | null;
}

export interface ICategoryServices {
  create: (name: string) => Promise<void>;
  getAll: () => Promise<Array<ICategory>>;
  getById: (id: number) => Promise<ICategory>;
  getByName: (name: string) => Promise<ICategory>;
}
