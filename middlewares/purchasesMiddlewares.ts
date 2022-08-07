import { Request, Response, NextFunction } from 'express';
import productsService from '../services/products';

export const verificateProductsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { products } = body;
    if(!products) throw { code: 400 };

    let selectedProducts = [];
    for(let i = 0; i < body.products.length; i++){
        const product = await productsService.getProductById(products[0]);
        if(!product) throw { code: 404 };
        selectedProducts.push(product._id);
    }

    res.locals.products = selectedProducts;
    next();
}