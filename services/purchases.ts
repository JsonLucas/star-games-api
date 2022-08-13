import { 
    getById, 
    create, 
    getPurchases, 
    verificateCardByUserId, 
    createCard,
    createAddress, 
    getCardsByUserId,
    getAddressesByUserId
} from "../repositories/purchases";

const purchasesServices = { 
    getPurchases, 
    getById, 
    create, 
    verificateCardByUserId, 
    createCard, 
    createAddress, 
    getCardsByUserId, 
    getAddressesByUserId
}; 
export default purchasesServices;