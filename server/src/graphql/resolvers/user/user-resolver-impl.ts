import { inject, injectable } from "inversify";
import { Types } from "../../../constants/types";
import { IUserRepository } from "../../../repository/user";
import { UnauthenticatedException, UnauthorizedException } from "../../../exceptions";
import { IUserMutations, IUserQueries, IUserResolver, IUserTypeResolver } from ".";
import { Dto } from "../../../model/dto";
import { IQuizRepository } from "../../../repository/quiz";
import { IAuthManager } from "../../../manager/auth";


@injectable()
export class UserResolverImpl implements IUserResolver {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;
  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.IAuthManager) private readonly authManager: IAuthManager;

  public get mutations(): IUserMutations {
    return {
      
    };
  }
  
  public get queries(): IUserQueries {
    return {
      login: async (_, args: { token: string }) => {
        return await this.authManager.loginWithGoogle(args.token);
      },
      me: async (_, args, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        let user = await this.userRepository.getUserByEmail(context.user.email);
        return new Dto.Output.User(user);
      },
    };
  };

  public get User(): IUserTypeResolver {
    return {
      submissions: async (user: Dto.Output.User) => {
        let submissions = await this.quizRepository.getSubmissionsForUser(user.id);
        return submissions.map(submission => new Dto.Output.Submission(submission));
      }
    };
  }

}