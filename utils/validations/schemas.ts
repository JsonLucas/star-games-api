import joi from 'joi';
import { Card } from '../../types/purchases';
import { Address, Login, SignUp } from '../../types/users';

export const signUpSchema = joi.object<SignUp>({
    name: joi.string().required(),
    nickname: joi.string().min(4),
    cpf: joi.number().required(), //colocar regex depois
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
    //phone: joi.string().empty()
});

export const signInSchema = joi.object<Login>({
    login: joi.string().required(),
    password: joi.string().required()
});

export const cardSchema = joi.object<Card>({
    name: joi.string().required(),
    number: joi.number().required(),
    cvv: joi.number().required(),
    expirationDate: joi.date().required()
});

export const addressSchema = joi.object<Address>({
    street: joi.string().required(),
    number: joi.number().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    neighborhood: joi.string().required(),
    complement: joi.string(),
    cep: joi.string().required()
});