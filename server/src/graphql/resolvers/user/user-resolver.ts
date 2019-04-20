import { inject, injectable } from "inversify";
import { Types } from "../../../constants/types";
import { IUserRepository } from "../../../repository/user";
import { UnauthenticatedException, UnauthorizedException } from "../../../exceptions";
import { OAuth2Client  } from "google-auth-library";
import { Constants } from "../../../constants/constants";
import { User } from "../../../model/entity/user";
import { sign } from "jsonwebtoken";
import { AuthCredentials } from "../../../model/dto/output/auth-credentials";
import { IUserMutations, IUserQueries, IUserResolver } from ".";


@injectable()
export class UserResolver implements IUserResolver {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;

  public get mutations(): IUserMutations {
    return {
      
    };
  }
  
  public get queries(): IUserQueries {
    return {
      login: async (_, args: { token: string }) => {
        let user = await this.login(args.token);
        let accessToken = await this.signJwt(user);
        return new AuthCredentials(accessToken);
      },
      me: (_, args, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        return this.userRepository.getUserByEmail(context.user.email);
      },
    };
  };

  private async login(googleAccessToken: string): Promise<User> {
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
      return this.userRepository.createUserIfNeeded(payload.email, payload.name);
    } catch (exception) {
      throw UnauthorizedException;
    }
  }

  private async signJwt(user: User): Promise<string> {
    return await sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )
  }

}