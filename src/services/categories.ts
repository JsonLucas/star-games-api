import { ICategory } from "../interfaces/entities/products";
import { ICategoryServices } from "../interfaces/use-cases/categories";
import { CategoryRepository } from "../repositories/categories";

export class CategoryServices implements ICategoryServices{
  constructor(private readonly categoryRepository: CategoryRepository){ }
  
  async create(name: string): Promise<void>{
	const newCategory = await this.categoryRepository.create(name);
  }

  async getAll(): Promise<Array<ICategory>>{
	const categories = await this.categoryRepository.getAll();
	if(!categories) throw { code: 404, error: 'colocar algum erro aqui depois' };

	return categories;
  }
  async getById(id: number): Promise<ICategory>{
	const category = await this.categoryRepository.getById(id);
	if(!category) throw { code: 404, error: 'category not found.' };

	return category;
  }
  async getByName(name: string): Promise<ICategory>{
	const category = await this.categoryRepository.getByName(name);
	if(!category) throw { code: 404, error: 'category not found.' };

	return category;
  }
}