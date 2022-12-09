import { Card, ICard, IPurchase } from "../entities/purchases";
import { Address, IAddress } from "../entities/users";

export interface IPurchaseRepository {
  create: (body: any) => Promise<void>;
  createCard: (body: Card) => Promise<void>;
  createAddress: (body: Address) => Promise<void>;
  getById: (id: number, userId: number) => Promise<IPurchase> | null;
  getUserPurchases: (userId: number) => Promise<Array<IPurchase>> | null;
  getCardsByUserId: (userId: number) => Promise<Array<ICard>> | null;
  getAddressesByUserId: (userId: number) => Promise<Array<IAddress>> | null;
  verificateCardByUserId: (userId: number, cardNumber: string) => Promise<ICard | null>;
  verificateUserAddress: (body: any) => Promise<IAddress | null>;
}

export interface IPurchaseServices {
  create: (body: any) => Promise<void>;
  createCard: (body: Card) => Promise<void>;
  createAddress: (body: Address) => Promise<void>;
  getById: (id: number, userId: number) => Promise<IPurchase>;
  getUserPurchases: (userId: number) => Promise<Array<IPurchase>>;
  getCardsByUserId: (userId: number) => Promise<Array<ICard>>;
  getAddressesByUserId: (userId: number) => Promise<Array<IAddress>>;
  verificateCardByUserId: (userId: number, cardNumber: string) => Promise<any>;
  verificateUserAddress: (body: any) => Promise<any>;
}
