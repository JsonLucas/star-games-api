import { getById, create, getPurchases } from "../repositories/purchases";

const purchasesServices = { getPurchases, getById, create }; 
export default purchasesServices;