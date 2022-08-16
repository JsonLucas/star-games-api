import { 
    getById, 
    create, 
    getUserPurchases, 
    verificateCardByUserId, 
    verificateUserAddress, 
    createCard,
    createAddress, 
    getCardsByUserId,
    getAddressesByUserId
} from "../repositories/purchases";

const purchasesServices = { 
    getUserPurchases, 
    getById, 
    create, 
    verificateCardByUserId, 
    verificateUserAddress, 
    createCard, 
    createAddress, 
    getCardsByUserId, 
    getAddressesByUserId
}; 
export default purchasesServices;