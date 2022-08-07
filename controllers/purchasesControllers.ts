import { Request, Response } from 'express';
import purchasesServices from '../services/purchases';

export const getPurchasesController = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const purchases = await purchasesServices.getPurchases(userId);
    
    if(!purchases) throw { code: 404 };
    res.status(200).send(purchases);
}

export const getPurchaseByIdController = async (req: Request, res: Response) => {
    const { purchaseId } = req.params;
    const { userId } = res.locals;
    if(!purchaseId) throw { code: 400 };

    const purchase = await purchasesServices.getById(purchaseId, userId);
    res.status(200).send(purchase);
}

export const createPurchaseController = async (req: Request, res: Response) => {
    const { userId, products } = res.locals;
    const data = { userId, products };
    await purchasesServices.create(data);
    res.sendStatus(201);
}