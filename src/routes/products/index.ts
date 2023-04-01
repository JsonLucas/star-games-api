import { Router } from "express";
import {
  favoriteProductController,
  getFavoritesController,
  getProductByIdController,
  getProductsController,
} from "../../controllers/productsControllers";
import authMiddleware from "../../middlewares/authMiddleware";

const products = Router();
products.get("/products", getProductsController);
products.get("/products/:productId", getProductByIdController);
products.get("/products/favorites", authMiddleware, getFavoritesController);
products.post("/products/favorites/:productId", authMiddleware, favoriteProductController);

export default products;
