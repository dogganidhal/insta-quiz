import { inject, injectable } from "inversify";
import { Types } from "../../../constants/types";
import { IUserRepository } from "../../../repository/user";
import { UnauthenticatedException, UnauthorizedException } from "../../../exceptions";
import { OAuth2Client  } from "google-auth-library";
import { Constants } from "../../../constants/constants";
import { sign } from "jsonwebtoken";
import { IUserMutations, IUserQueries, IUserResolver, IUserTypeResolver } from ".";
import { Dto } from "../../../model/dto";
import { Entity } from "../../../model/entity";
import { IQuizRepository } from "../../../repository/quiz";


@injectable()
export class UserResolver implements IUserResolver {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;
  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;

  public get mutations(): IUserMutations {
    return {
      
    };
  }
  
  public get queries(): IUserQueries {
    return {
      login: async (_, args: { token: string }) => {
        let user = await this.login(args.token);
        let accessToken = await this.signJwt(user);
        return new Dto.Output.AuthCredentials(accessToken);
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
      quizSubmissions: async (user: Dto.Output.User) => {
        let submissions = await this.quizRepository.getQuizSubmissionForUser(user.id);
        return submissions.map(submission => new Dto.Output.QuizSubmission(submission));
      }
    };
  }

  private async login(googleAccessToken: string): Promise<Entity.User> {
    let oAuthClient = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENTID);
    try {
      let ticket = await oAuthClient.verifyIdToken({
        idToken: googleAccessToken,
        audience: process.env.GOOGLE_OAUTH2_CLIENTID,
      });
      let payload = ticket.getPayload();
      if (payload.hd !== Constants.SUPPORTED_GSUITE_DOMAIN) { // TODO: Replace with proper validation logic
        throw UnauthorizedException;  
      }
      return this.userRepository.getOrCreateUser(payload.email, payload.name);
    } catch (exception) {
      throw UnauthorizedException;
    }
  }

  private async signJwt(user: Entity.User): Promise<string> {
    return await sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )
  }

}