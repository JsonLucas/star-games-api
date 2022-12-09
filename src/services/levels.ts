import { ILevel, Level } from "../interfaces/entities/levels";
import { ILevelServices } from "../interfaces/use-cases/levels";
import { LevelRepository } from "../repositories/levels";

export class LevelServices implements ILevelServices {
  constructor(private readonly levelRepository: LevelRepository) {}
  
  async create(body: Level): Promise<void> {
    const levelExists = await this.levelRepository.getByName(body.name);
    if (levelExists) throw { code: 409, error: "this level already exists." };

    await this.levelRepository.create(body);
  }

  async getById(id: number): Promise<ILevel> {
    const level = await this.levelRepository.getById(id);
    if (!level) throw { code: 404, error: "level not found." };

    return level;
  }
  
  async getByName(name: string): Promise<ILevel> {
    const level = await this.levelRepository.getByName(name);
    if (!level) throw { code: 404, error: "level not found." };

    return level;
  }
}
