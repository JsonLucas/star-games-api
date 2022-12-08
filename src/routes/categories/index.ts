import { Router } from "express";

const categoryRouter = Router();
categoryRouter.post('/category');
categoryRouter.get('/category');
categoryRouter.patch('/category');

export default categoryRouter;