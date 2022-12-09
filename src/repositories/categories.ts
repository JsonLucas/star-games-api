import prisma from "../database/database";
import { ICategory } from "../interfaces/entities/products";
import { ICategoryRepository } from "../interfaces/use-cases/categories";

export class CategoryRepository implements ICategoryRepository {
  async create(name: string): Promise<void> {
    await prisma.categories.create({ data: { name } });
  }

  async getAll(): Promise<Array<ICategory> | null> {
    return await prisma.categories.findMany();
  }

  async getById(id: number): Promise<ICategory> {
    return await prisma.categories.findUnique({ where: { id } });
  }

  async getByName(name: string): Promise<ICategory> {
    return await prisma.categories.findUnique({ where: { name } });
  }
}
