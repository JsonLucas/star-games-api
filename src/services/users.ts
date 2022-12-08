import { 
    create, 
    getById, 
    getByEmail, 
    getByNickname, 
    login, 
    updateUserScore
} from '../repositories/users';

const usersServices = { 
    create, 
    getById, 
    getByEmail, 
    getByNickname, 
    login, 
    updateUserScore 
};
export default usersServices;