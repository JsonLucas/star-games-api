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

export interface IAddresses {
    id?: number,
    street: string,
    number: string | number,
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
export type Address = Omit<IAddresses, 'id' | 'userId'>;
export type CreateUser = Omit<IUser, 'id' | 'levelId' | 'createdAt' | 'updatedAt' | 'totalScore' | 'currentLevelPoints'>;