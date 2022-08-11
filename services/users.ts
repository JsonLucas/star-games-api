import { 
    create, 
    getById, 
    getByEmail, 
    getByNickname, 
    login, 
    getLevelById 
} from '../repositories/users';

const usersServices = { create, getById, getByEmail, getByNickname, login, getLevelById };
export default usersServices;