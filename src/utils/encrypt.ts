import bcrypt from "bcrypt";

interface ICrypt {
  encrypt: (content: string) => string;
  compare: (content: string, hash: string) => boolean;
}

export class Crypt implements ICrypt {
  encrypt(content: string): string {
    return bcrypt.hashSync(content, 10).toString();
  }

  compare(content: string, hash: string): boolean {
    return bcrypt.compareSync(content, hash);
  }
}
