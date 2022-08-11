import { jwtSecret } from "./envConfig";
import jwt from 'jsonwebtoken';

export const tokenGeneration = (content: string) => {
    if(!jwtSecret) throw { code: 500, error: 'bad environment variables setting' };
    return jwt.sign(content, jwtSecret, {});
}

export const tokenVerification = (token: string) => {
    if(!jwtSecret) throw { code: 500, error: 'bad environment variables setting' };
    const verification = jwt.verify(token, jwtSecret, {});
    
    if(!verification) throw { code: 401, error: 'invalid token' };
    return jwt.decode(token); 
}