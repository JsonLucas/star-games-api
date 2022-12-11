import { jwtSecret } from "./envConfig";
import jsonwebtoken, { Jwt, JwtPayload } from "jsonwebtoken";

interface IToken {
  verificate: (auth: string, type: string) => any;
  generateRefreshToken: (userId: number) => string;
  generateAccessToken: (refreshToken: string) => string;
}

export class Token implements IToken {
  constructor() {
    if (!jwtSecret) throw { code: 500, error: "missing or invalid jwt key." };
  }

  verificate(auth: string, type: string): any {
    try {
      const verification = jsonwebtoken.verify(auth, jwtSecret, { ignoreExpiration: false }) as any;
      if (type === "access") {
        const payload = jsonwebtoken.decode(verification.refreshToken) as any;
        return payload;
      }
	  return verification.userId;
    } catch (e: any) {
      console.log(e);
      if (type === "access") {
        return this.generateAccessToken(auth);
      }
      throw { code: 403, error: e };
    }
  }

  generateRefreshToken(userId: number): string {
    const refreshToken = jsonwebtoken.sign({ userId }, jwtSecret, { expiresIn: "30d" });
    return refreshToken;
  }

  generateAccessToken(refreshToken: string): string {
    const accessToken = jsonwebtoken.sign({ refreshToken }, jwtSecret, { expiresIn: "1d" });
    return accessToken;
  }
}
