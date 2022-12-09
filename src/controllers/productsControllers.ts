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