import prisma from "../database/database";
import { ILevel, Level } from "../interfaces/entities/levels";
import { ILevelRepository } from "../interfaces/use-cases/levels";

export class LevelRepository implements ILevelRepository {
  async create(body: Level): Promise<ILevel> | null {
    const { name, totalPoints, features } = body;
    const jsonFeatures = JSON.stringify(features);
    return await prisma.levels.create({
      data: { name, totalPoints, features: jsonFeatures },
    });
  }

  async getById(id: number): Promise<ILevel> | null {
    return await prisma.levels.findUnique({ where: { id } });
  }
  
  async getByName(name: string): Promise<ILevel> | null {
    return await prisma.levels.findUnique({ where: { name } });
  }
}