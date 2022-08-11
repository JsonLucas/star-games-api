import dayjs from "dayjs";
import { products, purchases } from "../database/models";
import { PurchaseData } from "../types/purchases";

export const create = async (body: PurchaseData) => {
    let inserts = [];
    const { userId, products, payInformations } = body;
    const createdAt = dayjs(Date.now()).format('YYYY-MM-DD');
    for(let i = 0; i < products.length; i++){
        const creation = await purchases.create(
            { 
                userId, 
                productId: products[i], 
                status: 'pending', 
                createdAt,
                payInformations
            });
        inserts.push(creation);
    }
    return inserts;
}

export const getPurchases = async (userId: string) => {
    let productsData = [];
    const listPurchases = await purchases.find({ userId });
    for(let i = 0; i < listPurchases.length; i++){
        const product = await products.find({ id: listPurchases[i].productId });
        productsData.push(product);
    }
    return { listPurchases, productsData };
}

export const getById = async (_id: string, userId: string) => {
    return await purchases.findOne({ _id, userId });
} 