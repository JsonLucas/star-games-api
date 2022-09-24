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
    //await purchasesServices.create(purchase); 
	console.log(data);
    res.sendStatus(201);
}

export const addCardDataController = async (req: Request, res: Response) => {
    const { userId } =  res.locals;
    const { body } = req;
	console.log(body);
    //await purchasesServices.createCard({...body, userId});
    res.sendStatus(201);
}

export const addAddressDataController = async (req: Request, res: Response) => {
    const { address } =  res.locals;
	console.log(address);
    //await purchasesServices.createAddress(address);
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