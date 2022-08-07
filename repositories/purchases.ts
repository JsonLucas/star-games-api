import dayjs from "dayjs";
import { purchases } from "../database/models"

interface PurchaseData {
    userId: string,
    products: Array<string>
}

export const create = async (body: PurchaseData) => {
    let inserts = [];
    const { userId, products } = body;
    const createdAt = dayjs(Date.now()).format('YYYY-MM-DD');
    for(let i = 0; i < products.length; i++){
        const creation = await purchases.create({ userId, productId: products[i], status: 'pending', createdAt });
        inserts.push(creation);
    }
    return inserts;
}

export const getPurchases = async (userId: string) => {
    return await purchases.find({ userId });
}

export const getById = async (_id: string, userId: string) => {
    return await purchases.findOne({ _id, userId });
} 