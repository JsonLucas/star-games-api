import { ICategory } from "../entities/products";

export interface ICategoriesRepository {
  create: (name: string) => Promise<void>;
  getAll: () => Promise<Array<ICategory>>;
  getById: (id: number) => Promise<ICategory>;
  getByName: (name: string) => Promise<ICategory>;
}
