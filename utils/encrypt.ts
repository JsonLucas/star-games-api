import bcrypt from 'bcrypt';

export const encrypt = (content: string) => {
    return bcrypt.hashSync(content, 10).toString();
}

export const decrypt = (content: string, hash: string) => {
    return bcrypt.compareSync(content, hash); 
}