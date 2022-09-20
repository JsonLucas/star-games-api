import { create, getProducts, getProductById, updateStock } from "../repositories/products";

const productsService = { create, getProducts, getProductById, updateStock };
export default productsService;