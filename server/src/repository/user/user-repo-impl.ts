import { IUserRepository } from ".";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";
import { User } from "../../model/entity/user";


@injectable()
export class UserRepositoryImpl implements IUserRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getUserByEmail(email: string): Promise<User> {
    let repository = this.connection.getRepository(User);
    return repository.findOne({email: email});
  }

  public async createUserIfNeeded(email: string, fullName: string): Promise<User> {

    let repository = this.connection.getRepository(User);
    let userWithSameEmail = await repository.findOne({email: email});

    if (userWithSameEmail)
      return userWithSameEmail;

    let user = new User;

    user.email = email;
    user.fullName = fullName;

    return repository.save(user);

  }

}