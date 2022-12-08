import { jwtSecret } from "./envConfig";
import jsonwebtoken, { Jwt } from 'jsonwebtoken';

interface IToken {
	verificate: (auth: string) => Jwt,
	generateRefreshToken: (userId: number) => string,
	generateAccessToken: (refreshToken: string) => string
}

export class Token implements IToken{
	constructor() {
		if(!jwtSecret) throw { code: 500, error: 'missing or invalid jwt key.' };
	}
	verificate(auth: string): Jwt {
		try{
			const verification = jsonwebtoken.verify(auth, jwtSecret, { ignoreExpiration: false, complete: true });
			return verification;
		}catch(e: any){
			console.log(e);
			throw { code: 500, error: e };
		}
	}
	generateRefreshToken(userId: number): string{
		const refreshToken = jsonwebtoken.sign({ userId }, jwtSecret, { expiresIn: '30d' });
		return refreshToken;
	}
	generateAccessToken(refreshToken: string): string{
		const accessToken = jsonwebtoken.sign({ refreshToken }, jwtSecret, { expiresIn: '1d' });
		return accessToken;
	}
}

export const tokenGeneration = (content: string) => {
    if(!jwtSecret) throw { code: 500, error: 'bad environment variables setting' };
    return jsonwebtoken.sign(content, jwtSecret, {});
}

export const tokenVerification = (token: string) => {
    if(!jwtSecret) throw { code: 500, error: 'bad environment variables setting' };
    const verification = jsonwebtoken.verify(token, jwtSecret, {});
    
    if(!verification) throw { code: 401, error: 'invalid token' };
    return jsonwebtoken.decode(token); 
}