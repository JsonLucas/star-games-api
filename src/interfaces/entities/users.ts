import { ILevel } from "./levels";

export interface IUser {
    id?: number,
    name: string,
    nickname?: string,
    cpf: string,
    email: string,
    password: string,
    phone?: string,
    levelId: number,
    totalScore: number,
    currentLevelPoints: number,
    createdAt?: Date
	updatedAt?: Date
};

export interface IAddress {
    id?: number,
    street: string,
    number: number,
    city: string,
    state: string,
    neighborhood: string,
    complement?: string,
    cep: string,
    userId: number,
    createdAt?: Date
	updatedAt?: Date
}

export type Login = { login: string } & Pick<IUser, 'password'>;
export type SignUp = Omit<IUser, 'id' | 'levelId' | 'createdAt'> & {confirmPassword: string};
export type Address = Omit<IAddress, 'id'>;
export type CreateUser = Omit<IUser, 'id' | 'levelId' | 'createdAt' | 'updatedAt' | 'totalScore' | 'currentLevelPoints'>;
export type UpdateScore = Pick<IUser, 'totalScore' | 'currentLevelPoints'> & { levelId?: number };
export type UserInfo = { user: IUser, level: Pick<ILevel, 'id' | 'name' | 'totalPoints' | 'features'> };