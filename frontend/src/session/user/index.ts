import { User } from "../../model/user";
import { AuthCredentials } from "../../model/auth-credentials";


export interface IUserSession {
  readonly user: User | undefined;
  readonly authCredentials: AuthCredentials | undefined;
  saveUser(user: User): void;
  saveAuthCredentials(authCredentials: AuthCredentials): void;
  clear(): void;
}