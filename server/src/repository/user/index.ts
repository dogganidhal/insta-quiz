import { Entity } from "../../model/entity";


export interface IUserRepository {
  getUserById(userId: string): Promise<Entity.User>;
  getOrCreateUser(email: string, fullName: string): Promise<Entity.User>;
  getUserByEmail(email: string): Promise<Entity.User>;
}