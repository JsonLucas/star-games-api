import { FullProduct, IProducts, Product } from "../interfaces/entities/products";
import { IProductServices } from "../interfaces/use-cases/products";
import { ProductRepository } from "../repositories/products";
import { UserRepository } from "../repositories/users";

export class ProductServices implements IProductServices {
  private readonly userRepository: UserRepository;
  constructor(private readonly productRepository: ProductRepository) {
    this.userRepository = new UserRepository();
  }

  async create(body: Product): Promise<void> {
    const productExists = await this.productRepository.getProductByName(body.name);
    if (productExists) throw { code: 409, error: "this product already exists." };

	await this.productRepository.create(body);
  }

  async getProducts(userId?: number): Promise<Array<FullProduct>> {
	let formatedArray = [];
    const products = await this.productRepository.getProducts();
	if(userId){
		const user = await this.userRepository.getById(userId);
		if(!user) throw { code: 404, error: 'user not found.' };
		
		const favorites = await this.productRepository.getUserFavorites(userId);
		for(let i of products){
			if(favorites.find((item) => { return item.productId === i.id })){
				formatedArray.push({ ...i, favorite: true });
			}else{
				formatedArray.push({ ...i, favorite: false });
			}
		}
		return formatedArray;
	}
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

  async createFavorite(productId: number, userId: number): Promise<boolean>{
	const user = await this.userRepository.getById(userId);
	if(!user) throw { code: 404, error: 'user not found.' };

	const product = await this.productRepository.getProductById(productId);
	if(!product) throw { code: 404, error: 'product not found.' };

	return await this.productRepository.createFavorite(productId, userId);
  }

  async getUserFavorites(userId: number): Promise<Array<IProducts>>{
	const user = await this.userRepository.getById(userId);
	if(!user) throw { code: 404, error: 'user not found.' };

	const favorites = await this.productRepository.getUserFavorites(userId);
	if(!favorites) return [];

	let products = [];
	for(let i of favorites){
		const product = await this.productRepository.getProductById(i.productId);
		products.push(product);
	}
	return products;
  }
}
