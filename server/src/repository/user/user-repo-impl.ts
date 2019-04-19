import { IUserRepository } from ".";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";


@injectable()
export class UserRepositoryImpl implements IUserRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getUserByEmail(email: string) {
    throw new Error("Method not implemented.");
  }  
  
  public async signUp(fullName: string, email: string, googleAccessToken: string) {
    throw new Error("Method not implemented.");
  }

}