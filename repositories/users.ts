import dayjs from 'dayjs';
import { User } from '../types/users';
import { users } from '../database/models';

export const create = async (data: User) => {
    const now = dayjs(Date.now()).format('YYYY-MM-DD');
    return await users.create({ ...data, levelId: 1, createdAt: now, currentLevelPoints: 0 });
}

export const getById = async (id: number) => {
    return await users.findOne({_id: id});
}

export const getByEmail = async (email: string) => {
    const user = await users.findOne({ email });
    return user;
}

export const getByNickname = async (nickname: string) => {
    return await users.findOne({ nickname });
}

export const login = async (login: string) => {
    const byEmail = await users.findOne({ email: login });
    if(byEmail) { return byEmail; }

    const byNick = await users.findOne({ nickname: login });
    if(byNick) { return byNick; }

    return null;
}