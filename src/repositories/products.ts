import prisma from "../database/database";
import { IProducts, Product } from "../interfaces/entities/products";
import { IProductRepository } from "../interfaces/use-cases/products";

export class ProductRepository implements IProductRepository {
  async create(body: Product): Promise<void> {
    await prisma.products.create({ data: { ...body } });
  }

  async getProducts(): Promise<Array<IProducts> | null> {
    return await prisma.products.findMany();
  }

  async getProductById(id: number): Promise<IProducts | null> {
    return await prisma.products.findUnique({ where: { id } });
  }

  async getProductByName(name: string): Promise<IProducts | null> {
    return await prisma.products.findFirst({ where: { name } });
  }

  async updateStock(id: number, quantity: number): Promise<void> {
    await prisma.products.update({ where: { id }, data: { stock: quantity } });
  }
}
