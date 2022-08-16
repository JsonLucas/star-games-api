import dayjs from 'dayjs';
import { IUser } from '../types/users';
import { levels, users } from '../database/models';

export const create = async (data: IUser) => {
    const now = dayjs(Date.now()).format('YYYY-MM-DD');
    const setLevel = await levels.find();
    const { name, totalPoints, features, levelNumber } = setLevel[0];
    const { id } = await users.create({ ...data, createdAt: now, levelId: setLevel[0].id, totalScore: 0, currentLevelPoints: 0 });
    return { id, level: { name, totalPoints, features, levelNumber }};
}

export const getById = async (id: string) => {
    return await users.findOne({ id });
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

export const getLevelById = async (id: string) => {
    return await levels.findOne({ _id: id });
}

export const updateUserScore = async (userId: string, score: number) => {
    const user = await getById(userId);
    const level = await levels.findOne({ id: user?.levelId });
    if((!user) || (!level)) throw { code: 500 };

    const { totalPoints, levelNumber } = level;
    const { currentLevelPoints, totalScore } = user;

    const points = currentLevelPoints + score;
    if(points > totalPoints){
        const newLevel = await levels.findOne({ levelNumber: (levelNumber + 1) });
        if(!newLevel) throw { code: 500 };
        return await users.findOneAndUpdate({ _id: userId }, {
            levelId: newLevel.id,
            currentLevelPoints: (points - totalPoints),
            totalScore: (totalScore + score)
        });
    } else {
        return await users.findOneAndUpdate({ _id: userId }, { 
            currentLevelPoints: points,
            totalScore: totalScore + score
        });
    }
}
