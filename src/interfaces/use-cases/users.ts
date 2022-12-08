import { CreateUser, IUser } from "../entities/users";

export interface IUsersRepository {
  create: (data: CreateUser) => Promise<void>;
  getById: (id: number) => Promise<IUser>;
  getByEmail: (email: string) => Promise<IUser>;
  getByNickname: (nickname: string) => Promise<IUser>;
  login: (login: string) => Promise<boolean>;
  updateUserScore: (userId: number, score: number) => Promise<boolean>;
}
