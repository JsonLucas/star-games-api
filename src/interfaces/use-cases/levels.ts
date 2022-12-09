import { ILevel, Level } from "../entities/levels";

export interface ILevelRepository {
  create: (body: Level) => Promise<ILevel> | null;
  getById: (id: number) => Promise<ILevel> | null;
  getByName: (name: string) => Promise<ILevel> | null;
}

export interface ILevelServices {
  create: (body: Level) => Promise<void>;
  getById: (id: number) => Promise<ILevel>;
  getByName: (name: string) => Promise<ILevel>;
}
