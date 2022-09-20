import { Router } from "express";

const levelRouter = Router();
levelRouter.post('/level');
levelRouter.get('/level');
levelRouter.put('/level');

export default levelRouter;