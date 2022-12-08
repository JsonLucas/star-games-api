export interface ILevel {
	id: number,
	name: string,
	totalPoints: number,
	features: Object,
	createdAt?: Date,
	updatedAt?: Date
}

export type Level = Omit<ILevel, 'id' | 'createdAt' | 'updatedAt'>;