import dayjs from "dayjs";
import { cards, products, purchases, addresses } from "../database/models";
import { IAddress, ICard, PurchaseData } from "../types/purchases";

type Card = Omit<ICard, '_id'>;
type Address = Omit<IAddress, '_id'>;
type AddressVerification = Pick<IAddress, 'street' | 'number' | 'neighborhood' | 'city' | 'userId'>;

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

export const verificateCardByUserId = async (userId: string, cardNumber: string) => {
    return await cards.findOne({ userId, number: cardNumber });
}

export const verificateUserAddress = async (body: AddressVerification) => {
    return await addresses.findOne(body);
}

export const createCard = async (body: Card) => {
    return await cards.create(body);
}

export const createAddress = async (body: Address) => {
    return await addresses.create(body);
}

export const getAddressesByUserId = async (userId: string) => {
    return await addresses.find({ userId });
}

export const getCardsByUserId = async (userId: string) => {
    return await cards.find({ userId });
}