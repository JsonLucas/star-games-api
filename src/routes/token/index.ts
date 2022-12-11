import { Router } from "express";
import { refreshTokenController } from "../../controllers/refreshTokenController";
import { refreshTokenMiddleware } from "../../middlewares/refreshTokenMiddeware";

export const tokenRouter = Router();
tokenRouter.post('/auth', refreshTokenMiddleware, refreshTokenController);