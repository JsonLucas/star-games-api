import db from "../database/database";
import { Request, Response, NextFunction } from "express";

const dbMiddleware = (req: Request, res: Response, next: NextFunction) => {
    db();
    next();
}

export default dbMiddleware;