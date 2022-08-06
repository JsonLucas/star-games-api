export interface User {
    id?: number,
    name: string,
    nickname?: string,
    cpf: string,
    email: string,
    password: string | Buffer,
    phone?: string,
    levelId?: number,
    createdAt?: Date,
    currentLevelPoints?: number
};

export type Login = { login: string } & Pick<User, 'password'>;
export type SignUp = Omit<User, 'id' | 'levelId' | 'createdAt'> & {confirmPassword: string};