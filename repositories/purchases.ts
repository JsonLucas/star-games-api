import dayjs from "dayjs";
import usersServices from "../services/users";
import { IAddress, ICard, PurchaseData } from "../types/purchases";
import { cards, products as tableProducts, purchases, addresses } from "../database/models";

type Card = Omit<ICard, '_id'>;
type Address = Omit<IAddress, '_id'>;
type AddressVerification = Pick<IAddress, 'street' | 'number' | 'neighborhood' | 'city' | 'userId'>;

export const create = async (body: PurchaseData) => {
    let inserts = [];
    const { scorePoints, userData, products } = body;
    for(let i = 0; i < products.length; i++){
        const { productId, quantity } = products[i];
        const insert = await purchases.create({
            productId, quantity, userData
        }); 
        const product = await tableProducts.findOne({ id: productId });
        if(!product?.stock) throw { code: 500 };
        await tableProducts.findOneAndUpdate({ id: productId }, { stock: (product.stock - quantity) });
        inserts.push(insert);
    }
    await usersServices.updateUserScore(userData.userId, scorePoints);
    return inserts;
}

export const getUserPurchases = async (userId: string) => {
    return await purchases.find({ userId });
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