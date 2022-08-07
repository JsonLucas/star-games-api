import { products } from "../database/models";

export const getProducts = async () => {
    return await products.find();
}

export const getProductById = async (productId: string) => {
    return await products.findOne({ _id: productId });
}