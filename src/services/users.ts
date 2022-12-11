import { CreateUser, IUser, UserData, UserInfo } from "../interfaces/entities/users";
import { IUserServices } from "../interfaces/use-cases/users";
import { LevelRepository } from "../repositories/levels";
import { UserRepository } from "../repositories/users";

export class UserServices implements IUserServices {
  private readonly levelRepository: LevelRepository;
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUser): Promise<UserInfo> {
	const verificateUser = await this.userRepository.getByEmail(data.email);
	if(verificateUser) throw { code: 409, error: 'this user already exists.' };

	return await this.userRepository.create(data);
  }

  async getById(id: number): Promise<IUser> {
	const user = await this.userRepository.getById(id);
	if(!user) throw { code: 404, error: 'user not found.' };

	return user;
  }

  async getByEmail(email: string): Promise<IUser> {
	const user =  await this.userRepository.getByEmail(email);
	if(!user) throw { code: 404, error: 'user not found.' };

	return user;
  }

  async getByNickname(nickname: string): Promise<IUser> {
	const user =  await this.userRepository.getByNickname(nickname);
	if(!user) throw { code: 404, error: 'user not found.' };

	return user;
  }

  async getInformation(userId: number): Promise<UserData>{
	const user = await this.userRepository.getById(userId);
	if(!user) throw { code: 404, error: 'user not found.' };

	return await this.userRepository.getInformation(userId);
  }

  async login(login: string): Promise<IUser> {
    const byNick = await this.userRepository.getByNickname(login);
    if (byNick) return byNick;

    const byEmail = await this.userRepository.getByEmail(login);
    if (byEmail) return byEmail;

    throw { code: 404, error: "user not found" };
  }
  
  async updateUserScore(userId: number, score: number): Promise<boolean> {
    const { totalScore, currentLevelPoints, levelId } =
      await this.userRepository.getById(userId);
    const { totalPoints, id } = await this.levelRepository.getById(levelId);
    const updatedTotalPoints = totalScore + score;
    let update;
    if (score + currentLevelPoints > totalPoints) {
      update = {
        totalScore: updatedTotalPoints,
        currentLevelPoints: score + currentLevelPoints - totalPoints,
        levelId: id + 1,
      };
    } else {
      update = {
        totalScore: updatedTotalPoints,
        currentLevelPoints: score + currentLevelPoints,
      };
    }
	await this.userRepository.updateUserScore(userId, update);
	return true;
  }
}
