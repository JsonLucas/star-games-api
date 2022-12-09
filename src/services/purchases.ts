import { Card, ICard, IPurchase } from "../interfaces/entities/purchases";
import { Address, IAddress } from "../interfaces/entities/users";
import { IPurchaseServices } from "../interfaces/use-cases/purchases";
import { PurchaseRepository } from "../repositories/purchases";

export class PurchaseServices implements IPurchaseServices{
	constructor(private readonly purchaseRepository: PurchaseRepository) {  }
	async create(body: any): Promise<void>{
	}
	async createCard(body: Card): Promise<void>{
		const cardExists = await this.purchaseRepository.getCardsByUserId(body.userId);
		for(let i of cardExists){
			if(i === body) throw { code: 409, error: 'this card is already in use.' };
		}
		await this.purchaseRepository.createCard(body);
	}
	async createAddress(body: Address): Promise<void>{
		const addressExists = await this.purchaseRepository.getAddressesByUserId(body.userId);
		for(let i of addressExists){
			if(i === body) throw { code: 409, error: 'this address is already in use.' };
		}
		await this.purchaseRepository.createAddress(body);
	}
	async getById(id: number, userId: number): Promise<IPurchase>{
		const purchase = await this.purchaseRepository.getById(id);
		if(!purchase) throw { code: 404, error: 'purchase not found.' };

		if(purchase.userId !== userId) throw { code: 403, error: 'you dont have permission to access this information' };

		return purchase;
	}
	async getUserPurchases(userId: number): Promise<Array<IPurchase>>{
		const purchases = await this.purchaseRepository.getUserPurchases(userId);
		if(!purchases) throw { code: 404, error: 'alguma mensagem de erro aqui' };

		return purchases;
	}
	async getCardsByUserId(userId: number): Promise<Array<ICard>>{
		const cards = await this.purchaseRepository.getCardsByUserId(userId);
		if(!cards) throw { code: 404, error: 'alguma mensagem aqui tbm' };

		return cards;
	}
	async getAddressesByUserId(userId: number): Promise<Array<IAddress>>{
		const addresses = await this.purchaseRepository.getAddressesByUserId(userId);
		if(!addresses) throw { code: 404, error: 'mais alguma mensagem aqui tbm' };

		return addresses;
	}
	async verificateCardByUserId(userId: number, cardNumber: string): Promise<any>{}
	async verificateUserAddress(body: any): Promise<any>{}
}