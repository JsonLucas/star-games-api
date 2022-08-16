import { 
    create, 
    getById, 
    getByEmail, 
    getByNickname, 
    login, 
    getLevelById, 
    updateUserScore
} from '../repositories/users';

const usersServices = { 
    create, 
    getById, 
    getByEmail, 
    getByNickname, 
    login, 
    getLevelById, 
    updateUserScore 
};
export default usersServices;