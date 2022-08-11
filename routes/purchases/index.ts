import { Router } from 'express';
import { 
    createPurchaseController, 
    getPurchaseByIdController, 
    getPurchaseHistoryController, 
    getPurchasesController
} from '../../controllers/purchasesControllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { verificateProductsMiddleware } from '../../middlewares/purchasesMiddlewares';

const purchases = Router();
purchases.get('/purchases', authMiddleware, getPurchasesController);
purchases.post('/purchase', authMiddleware, verificateProductsMiddleware, createPurchaseController);
purchases.get('/purchase/:purchaseId', authMiddleware, getPurchaseByIdController);
purchases.put('/purchase/:purchaseId', authMiddleware); //modificar compra
purchases.delete('/purchase/:purchaseId', authMiddleware); //deletar/cancelar compra compra
purchases.get('/purchases/history', authMiddleware, getPurchaseHistoryController);

export default purchases;