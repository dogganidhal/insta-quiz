import { Dto } from "../../model/dto";


export interface IAuthManager {
  loginWithGoogle(token: string): Promise<Dto.Output.AuthCredentials>;
}