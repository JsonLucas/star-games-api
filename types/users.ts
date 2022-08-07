export interface IUser {
    _id?: string | number,
    name: string,
    nickname?: string,
    cpf: string,
    email: string,
    password: string | Buffer,
    phone?: string,
    levelId?: string | number,
    totalScore?: number
    createdAt?: Date
};

export type Login = { login: string } & Pick<IUser, 'password'>;
export type SignUp = Omit<IUser, 'id' | 'levelId' | 'createdAt'> & {confirmPassword: string};