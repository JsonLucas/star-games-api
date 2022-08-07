import { Schema } from 'mongoose';

export const usersSchema = new Schema({ 
    name: String,
    nickname: String,
    cpf: String,
    email: String,
    password: String,
    phone: String,
    levelId: String,
    totalScore: Number
});

export const addressesSchema = new Schema({
    street: String,
    number: String,
    cep: String,
    userId: String
});

export const cardsSchema = new Schema({
    name: String,
    number: String,
    cvv: String,
    expirationDate: Date,
    userId: String
});

export const productsSchema = new Schema({
    name: String,
    price: Number,
    shipping: Number, //frete
    categoryId: String,
    stock: Number,
    image: String
});

export const categoriesSchema = new Schema({
    name: String,
});

export const purchasesSchema = new Schema({
    userId: String,
    productId: Number,
    createdAt: Date,
    status: String // pending, in progress, finished
});

export const levelsSchema = new Schema({
    name: String,
    levelNumber: Number,
    features: Object,
    totalPoints: Number
});