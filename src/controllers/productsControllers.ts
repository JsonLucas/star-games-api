import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/products';
import { ProductServices } from '../services/products';

export const getProductsController = async (req: Request, res: Response) => {
	const productServices = new ProductServices(new ProductRepository());
    const products = await productServices.getProducts();
    res.status(200).send(products); 
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    if(!productId) throw { code: 400 };

	const productServices = new ProductServices(new ProductRepository());
    const product = await productServices.getProductById(Number(productId));
    res.status(200).send(product);
}

export const favoriteProductController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    if(!productId) throw { code: 400 };

	const { userId } = res.locals;
	const productService = new ProductServices(new ProductRepository());
	await productService.createFavorite(Number(productId), userId);
	res.sendStatus(200);
}

export const getFavoritesController = async (req: Request, res: Response) => {
	const { userId } = res.locals;
	console.log('teste');
	const productServices = new ProductServices(new ProductRepository());
	const products = await productServices.getUserFavorites(userId);
	res.status(200).send(products);
}