import { CreateUser, IUser, UpdateScore, UserData, UserInfo } from "../entities/users";

export interface IUserRepository {
  create: (data: CreateUser) => Promise<UserInfo>;
  getById: (id: number) => Promise<IUser> | null;
  getByEmail: (email: string) => Promise<IUser> | null;
  getByNickname: (nickname: string) => Promise<IUser> | null;
  getInformation: (userId: number) => Promise<UserData> | null,
  updateUserScore: (userId: number, score: UpdateScore) => Promise<boolean>;
}

export interface IUserServices {
  create: (data: CreateUser) => Promise<UserInfo>;
  getById: (id: number) => Promise<IUser>;
  getByEmail: (email: string) => Promise<IUser>;
  getByNickname: (nickname: string) => Promise<IUser>;
  getInformation: (userId: number) => Promise<UserData>;
  login: (login: string) => Promise<IUser>;
  updateUserScore: (userId: number, score: number) => Promise<boolean>;
}
