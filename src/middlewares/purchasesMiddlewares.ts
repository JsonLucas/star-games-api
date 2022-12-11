import { Request, Response, NextFunction } from 'express';
import { ProductRepository } from '../repositories/products';
import { PurchaseRepository } from '../repositories/purchases';
import { ProductServices } from '../services/products';
import { PurchaseServices } from '../services/purchases';
import { addressSchema, cardSchema } from '../utils/schemas';
import { Validator } from '../utils/validator';

export const verificateProductsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { products } = body;
    if(!products) throw { code: 400 };

	const productServices = new ProductServices(new ProductRepository());
    for(let i = 0; i < products.length; i++){
        const product = await productServices.getProductById(products[i].productId);
        if(!product) throw { code: 404 };
    }

    res.locals.data = { ...body };
    next();
}

export const verificateCardDataMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals;
    const { body } = req;
	const validator = new Validator();
    await validator.validate(body, cardSchema);

	const purchaseServices = new PurchaseServices(new PurchaseRepository());
    const card = await purchaseServices.verificateCardByUserId(userId, body.number);
    if(card) throw { code: 409, error: 'you already have a card with this number.' };
    next();
}

export const verificateAddressMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals;
    const { body } = req;
	const validator = new Validator();
	await validator.validate(body, addressSchema);
    
    const { number, street, city, neighborhood, state, complement, cep } = body;
	const addressObj = { number: Number(number), street, city, neighborhood, state, complement, cep };
	const purchaseServices = new PurchaseServices(new PurchaseRepository());
    const address = await purchaseServices.verificateUserAddress({
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