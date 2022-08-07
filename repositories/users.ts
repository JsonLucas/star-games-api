import dayjs from 'dayjs';
import { IUser } from '../types/users';
import { levels, users } from '../database/models';

export const create = async (data: IUser) => {
    const now = dayjs(Date.now()).format('YYYY-MM-DD');
    const setLevel = await levels.find();
    return await users.create({ ...data, createdAt: now, levelId: setLevel[0]._id, totalScore: 0 });
}

export const getById = async (id: string) => {
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