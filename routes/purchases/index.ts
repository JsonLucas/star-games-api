import { Router } from 'express';
import { 
    addAddressDataController,
    addCardDataController,
    createPurchaseController, 
    getAddressController, 
    getCardsController, 
    getPurchaseByIdController, 
    getPurchaseHistoryController, 
    getPurchasesController
} from '../../controllers/purchasesControllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { verificateAddressMiddleware, verificateCardDataMiddleware, verificateProductsMiddleware } from '../../middlewares/purchasesMiddlewares';

const purchases = Router();
purchases.get('/purchases', authMiddleware, getPurchasesController);
purchases.post('/purchase', authMiddleware, verificateProductsMiddleware, createPurchaseController);
purchases.get('/purchase/:purchaseId', authMiddleware, getPurchaseByIdController);
purchases.put('/purchase/:purchaseId', authMiddleware); //modificar compra
purchases.delete('/purchase/:purchaseId', authMiddleware); //deletar/cancelar compra compra
purchases.get('/purchases/history', authMiddleware, getPurchaseHistoryController);
purchases.post('/purchases/payment', authMiddleware, verificateCardDataMiddleware, addCardDataController);
purchases.post('/purchases/address', authMiddleware, verificateAddressMiddleware, addAddressDataController);
purchases.get('/purchases/payment', authMiddleware, getCardsController);
purchases.get('/purchases/address', authMiddleware, getAddressController);

export default purchases;