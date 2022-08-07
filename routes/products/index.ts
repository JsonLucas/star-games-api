import { Router } from "express";
import { getProductByIdController, getProductsController } from "../../controllers/productsControllers";
import authMiddleware from "../../middlewares/authMiddleware";

const products = Router();
products.get('/products', getProductsController);
products.get('/products/:productId', getProductByIdController);

export default products;