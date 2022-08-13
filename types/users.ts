export interface IUser {
    _id?: string,
    name: string,
    nickname?: string,
    cpf: string,
    email: string,
    password: string | Buffer,
    phone?: string,
    levelId?: string | number,
    totalScore?: number,
    currentLevelPoints?: number,
    createdAt?: Date
};

export interface IAddresses {
    _id?: string,
    street: string,
    number: string | number,
    city: string,
    state: string,
    neighborhood: string,
    complement?: string,
    cep: string,
    userId: string
}

export type Login = { login: string } & Pick<IUser, 'password'>;
export type SignUp = Omit<IUser, '_id' | 'levelId' | 'createdAt'> & {confirmPassword: string};
export type Address = Omit<IAddresses, '_id' | 'userId'>;