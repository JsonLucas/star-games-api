import { Card } from "../../interfaces/purchases";
import { Address, Login, SignUp } from "../../interfaces/users";
import { addressSchema, cardSchema, signInSchema, signUpSchema } from "./schemas";

export const validateSignUp = (data: SignUp) => {
    const { error } = signUpSchema.validate(data);
    if(error) throw { code: 422, error };
}

export const validateSignIn = (data: Login) => {
    const { error } = signInSchema.validate(data);
    if(error) throw { code: 422, error };
}

export const validateCard = (data: Card) => {
    const { error } = cardSchema.validate(data);
    if(error) throw { code: 422, error };
}

export const validateAddress = (data: Address) => {
    const { error } = addressSchema.validate(data);
    if(error) throw { code: 422, error };
}