import prisma from "../database/database";
import {
  CreateUser,
  IUser,
  UpdateScore,
  UserData,
  UserInfo,
} from "../interfaces/entities/users";
import { IUserRepository } from "../interfaces/use-cases/users";

export class UserRepository implements IUserRepository {
  async create(data: CreateUser): Promise<IUser> | null {
    const user = await prisma.users.create({ data: { ...data } });
    const level = await prisma.levels.findUnique({
      where: { id: user.levelId },
      select: {
        id: true,
        name: true,
        totalPoints: true,
        features: true,
      },
    });
    return user;
  }

  async getById(id: number): Promise<IUser> | null {
    return await prisma.users.findUnique({ where: { id } });
  }

  async getByEmail(email: string): Promise<IUser> | null {
    return await prisma.users.findUnique({ where: { email } });
  }

  async getByNickname(nickname: string): Promise<IUser> | null {
    return await prisma.users.findUnique({ where: { nickname } });
  }

  async updateUserScore(userId: number, update: UpdateScore): Promise<boolean> {
    await prisma.users.update({
      where: { id: userId },
      data: {
        ...update,
      },
    });
    return true;
  }

  async getInformation(userId: number): Promise<UserData> {
    return await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
		currentLevelPoints: true,
        level: {
          select: {
			id: true,
            name: true,
            totalPoints: true,
            features: true,
          },
        },
        address: {
          select: {
            street: true,
            number: true,
            state: true,
            city: true,
            neighborhood: true,
            complement: true,
            cep: true,
          },
        },
        card: {
          select: {
            name: true,
            number: true,
            cvv: true,
            expirationDate: true,
          },
        },
      },
    });
  }
}
