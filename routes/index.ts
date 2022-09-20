import { Router } from 'express';
import categoryRouter from './categories';
import levelRouter from './levels';
import products from './products';
import purchases from './purchases';
import users from './users';

const router = Router();
router.use(users);
router.use(products);
router.use(purchases);
router.use(categoryRouter);
router.use(levelRouter);

export default router;