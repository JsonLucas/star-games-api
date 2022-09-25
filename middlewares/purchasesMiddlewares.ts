import { Request, Response, NextFunction } from 'express';
import productsService from '../services/products';
import purchasesServices from '../services/purchases';
import { validateAddress, validateCard } from '../utils/validations/functions';

export const verificateProductsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { products } = body;
    if(!products) throw { code: 400 };

    for(let i = 0; i < products.length; i++){
        const product = await productsService.getProductById(products[i].productId);
        if(!product) throw { code: 404 };
    }

    res.locals.data = { ...body };
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

export const verificateAddressMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals;
    const { body } = req;
    validateAddress(body);
    
    const { number, street, city, neighborhood, state, complement, cep } = body;
	const addressObj = { number: Number(number), street, city, neighborhood, state, complement, cep };
    const address = await purchasesServices.verificateUserAddress({
		userId: Number(userId), 
		number: Number(number), 
		street, 
		city, 
		neighborhood
	});
    if(address) throw { code: 409, error: 'you already have this address registered' };
	
    res.locals.address = { ...addressObj, userId: Number(userId) };
    next();
}