import { IProducts, Product } from "../interfaces/entities/products";
import { IProductServices } from "../interfaces/use-cases/products";
import { ProductRepository } from "../repositories/products";

export class ProductServices implements IProductServices {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(body: Product): Promise<void> {
    const productExists = await this.productRepository.getProductByName(body.name);
	if(productExists) throw { code: 409, error: 'this product already exists.' };
  }

  async getProducts(): Promise<Array<IProducts>> {
    const products = await this.productRepository.getProducts();
    return products;
  }
  
  async getProductById(id: number): Promise<IProducts> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw { code: 404, error: "product not found." };

    return product;
  }
  
  async getProductByName(name: string): Promise<IProducts> {
    const product = await this.productRepository.getProductByName(name);
    if (!product) throw { code: 404, error: "product not found." };

    return product;
  }
  
  async updateStock(id: number, quantity: number): Promise<void> {
    const productExists = await this.productRepository.getProductById(id);
    if (!productExists) throw { code: 404, error: "product not found." };

    await this.productRepository.updateStock(id, quantity);
  }
}
