import prisma from "../database/database";
import { Card, ICard, IPurchase } from "../interfaces/entities/purchases";
import { Address, IAddress } from "../interfaces/entities/users";
import { IPurchaseRepository } from "../interfaces/use-cases/purchases";

type AddressVerification = Pick<IAddress, "street" | "number" | "neighborhood" | "city" | "userId">;

export class PurchaseRepository implements IPurchaseRepository {
  async create(body: any): Promise<void> {
    const { scorePoints, products } = body;
    /*for(let i in products){
			await prisma.products.update({ data: { 
					stock: products[i].updatedStock  
				}, where: { 
					id: Number(products[i].productId) 
				} 
			});
			await prisma.purchases.create({ data: {
				quantity: products[i].quantity,
				productId: Number(products[i].productId), 
				userId
			} });
		}
		await usersServices.updateUserScore(userId, scorePoints);*/
    console.log(body);
  }

  async getUserPurchases(userId: number): Promise<Array<IPurchase> | null> {
    return await prisma.purchases.findMany({ where: { userId } });
  }

  async getById(id: number): Promise<IPurchase | null> {
    return await prisma.purchases.findUnique({ where: { id } });
  }

  async verificateCardByUserId(userId: number, cardNumber: string): Promise<ICard | null> {
    return await prisma.cards.findFirst({
      where: { userId, number: cardNumber },
    });
  }

  async verificateUserAddress(body: AddressVerification): Promise<IAddress | null> {
    return await prisma.addresses.findFirst({ where: { ...body } });
  }

  async createCard(body: Card): Promise<void> {
    await prisma.cards.create({ data: { ...body } });
  }

  async createAddress(body: any): Promise<void> {
    await prisma.addresses.create({ data: { ...body } });
  }

  async getAddressesByUserId(userId: number): Promise<Array<IAddress> | null> {
    return await prisma.addresses.findMany({ where: { userId } });
  }

  async getCardsByUserId(userId: number): Promise<Array<ICard> | null> {
    return await prisma.cards.findMany({ where: { userId } });
  }
}
