import { IUserResolver } from ".";
import { inject, injectable } from "inversify";
import { Types } from "../../constants/types";
import { IUserRepository } from "../../repository/user";
import { UserNotFoundException, WrongPasswordException, UnauthenticatedException } from "../../exceptions";
import { sign } from "jsonwebtoken";


@injectable()
export class UserResolver implements IUserResolver {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;

  public get mutations() {
    return {
      login: (_, args: { googleAccessToken: string, password: string }) => {
        // TODO: Handle login with google
      }
    };
  }
  public get queries() {
    return {
      me: (_, args, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        return this.userRepository.getUserByEmail(context.user.email);
      },
    };
  };

}