import { Request, Response } from 'express';
import productsService from '../services/products';

export const getProductsController = async (req: Request, res: Response) => {
    const products = await productsService.getProducts();
    res.status(200).send(products); 
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    if(!productId) throw { code: 400 };

    const product = await productsService.getProductById(productId.toString());
    res.status(200).send(product);
}