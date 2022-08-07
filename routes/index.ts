import { Router } from 'express';
import products from './products';
import purchases from './purchases';
import users from './users';

const router = Router();
router.use(users);
router.use(products);
router.use(purchases);

export default router;