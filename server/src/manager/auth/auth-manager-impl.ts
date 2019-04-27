import { IAuthManager } from ".";
import { Entity } from "../../model/entity";
import { OAuth2Client } from "google-auth-library";
import { Constants } from "../../constants/constants";
import { UnauthorizedException } from "../../exceptions";
import { inject, injectable } from "inversify";
import { Types } from "../../constants/types";
import { IUserRepository } from "../../repository/user";
import { sign } from "jsonwebtoken";
import { Dto } from "../../model/dto";



@injectable()
export class AuthManagerImpl implements IAuthManager {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;

  public async loginWithGoogle(token: string): Promise<Dto.Output.AuthCredentials> {
    let oAuthClient = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENTID);
    try {
      let ticket = await oAuthClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_OAUTH2_CLIENTID,
      });
      let payload = ticket.getPayload();
      if (payload.hd !== Constants.SUPPORTED_GSUITE_DOMAIN) // TODO: Replace with proper validation logic
        throw UnauthorizedException;
      let user = await this.userRepository.getOrCreateUser(payload.email, payload.name);
      let accessToken = await this.signJwt(user);
      return new Dto.Output.AuthCredentials(accessToken);
    } catch (exception) {
      throw UnauthorizedException;
    }
  }

  private async signJwt(user: Entity.User): Promise<string> {
    return await sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: Constants.JWT_TOKEN_EXPIRES_IN }
    )
  }

}