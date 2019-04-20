import { IUserRepository } from ".";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";
import { Entity } from "../../model/entity";


@injectable()
export class UserRepositoryImpl implements IUserRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getUserByEmail(email: string): Promise<Entity.User> {
    let repository = this.connection.getRepository(Entity.User);
    return repository.findOne({email: email});
  }

  public async getUserById(userId: string): Promise<Entity.User> {
    let repository = this.connection.getRepository(Entity.User);
    return repository.findOne({ id: userId });
  }

  public async getOrCreateUser(email: string, fullName: string): Promise<Entity.User> {

    let repository = this.connection.getRepository(Entity.User);
    let userWithSameEmail = await repository.findOne({email: email});

    if (userWithSameEmail)
      return userWithSameEmail;

    let user = new Entity.User();

    user.email = email;
    user.fullName = fullName;

    return repository.save(user);

  }

}