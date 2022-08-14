import { 
    getById, 
    create, 
    getPurchases, 
    verificateCardByUserId, 
    verificateUserAddress, 
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
    verificateUserAddress, 
    createCard, 
    createAddress, 
    getCardsByUserId, 
    getAddressesByUserId
}; 
export default purchasesServices;