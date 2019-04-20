import { User } from "../../model/entity/user";


export interface IUserRepository {
  createUserIfNeeded(email: string, fullName: string): Promise<User>;
  getUserByEmail(email: string);
}