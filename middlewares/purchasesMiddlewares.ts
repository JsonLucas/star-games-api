import { Request, Response, NextFunction } from 'express';
import productsService from '../services/products';
import purchasesServices from '../services/purchases';
import { validateCard } from '../utils/validations/functions';

export const verificateProductsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { products, payInformations } = body;
    if(!products) throw { code: 400 };

    let selectedProducts = [];
    for(let i = 0; i < body.products.length; i++){
        const product = await productsService.getProductById(products[0]);
        if(!product) throw { code: 404 };
        selectedProducts.push(product._id);
    }

    res.locals.products = selectedProducts;
    res.locals.payInformations = payInformations;
    next();
}

export const verificateCardDataMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals;
    const { body } = req;
    validateCard(body);

    const card = await purchasesServices.verificateCardByUserId(userId, body.number);
    if(card) throw { code: 409, error: 'you already have a card with this number.' };
    next();
}

export const verificateAddressMiddleware = async (req: Request, res: Response, next: NextFunction) => {}