import { Request, Response } from 'express';
import purchasesServices from '../services/purchases';

export const getPurchasesController = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const purchases = await purchasesServices.getUserPurchases(userId);
    
    if(!purchases) throw { code: 404 };
    res.status(200).send(purchases);
}

export const getPurchaseByIdController = async (req: Request, res: Response) => {
    const { purchaseId } = req.params;
    const { userId } = res.locals;
    if(!purchaseId) throw { code: 400 };

    const purchase = await purchasesServices.getById(Number(purchaseId), userId);
    res.status(200).send(purchase);
}

export const createPurchaseController = async (req: Request, res: Response) => {
    const { userId, data } = res.locals;
    const { addressId, scorePoints, cardId, payMethod, products } = data;
	const formatData = {
		userData: { 
			userId, 
			addressId: Number(addressId), 
			payInformations: {
				method: payMethod,
				cardId: cardId 
			}
		},
		products,
		scorePoints 
	};
    await purchasesServices.create(formatData); 
	res.sendStatus(201);
}

// {
// 	products: [ { productId: 2, quantity: 1 } ],
// 	cardId: '1',
// 	addressId: '1',
// 	scorePoints: 478,
// 	payMethod: 'card'
// }

export const addCardDataController = async (req: Request, res: Response) => {
    const { userId } =  res.locals;
    const { body } = req;
	const { name, number, cvv, expirationDate } = body;
	const card = { name, number, cvv: Number(cvv), expirationDate: new Date(expirationDate) };
    await purchasesServices.createCard({...card, userId});
    res.sendStatus(201);
}

export const addAddressDataController = async (req: Request, res: Response) => {
    const { address } =  res.locals;
    await purchasesServices.createAddress(address);
    res.sendStatus(201);
}

export const getCardsController = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const cards = await purchasesServices.getCardsByUserId(userId);
    res.status(200).send(cards);
}

export const getAddressController = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const addresses = await purchasesServices.getAddressesByUserId(userId);
    res.status(200).send(addresses);
}