import { ILevel, Level } from "../entities/levels"

export interface ILevelsRepository{
	create: (body: Level) => Promise<void>
	getById: (id: number) => Promise<ILevel>
	getByName: (name: string) => Promise<ILevel>
}