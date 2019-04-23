import { IUserSession } from ".";
import { User } from "../../model/user";
import { AuthCredentials } from "../../model/auth-credentials";
import { injectable } from "inversify";


@injectable()
export class UserSessionImpl implements IUserSession {

  private static readonly USER_LOCAL_STORAGE_KEY = "@insta-quiz/user";
  private static readonly AUTH_CREDENTIALS_LOCAL_STORAGE_KEY = "@insta-quiz/auth-credentials";

  public get user(): User | undefined {
    let json = localStorage.getItem(UserSessionImpl.USER_LOCAL_STORAGE_KEY);
    return json ? <User>JSON.parse(json) : undefined;
  };

  public get authCredentials(): AuthCredentials | undefined {
    let json = localStorage.getItem(UserSessionImpl.AUTH_CREDENTIALS_LOCAL_STORAGE_KEY);
    return json ? <AuthCredentials>JSON.parse(json) : undefined;
  };

  public saveUser(user: User) {
    let json = JSON.stringify(user);
    localStorage.setItem(UserSessionImpl.USER_LOCAL_STORAGE_KEY, json);
  }

  public saveAuthCredentials(authCredentials: AuthCredentials) {
    let json = JSON.stringify(authCredentials);
    localStorage.setItem(UserSessionImpl.AUTH_CREDENTIALS_LOCAL_STORAGE_KEY, json);
  }

  public clear() {
    localStorage.removeItem(UserSessionImpl.USER_LOCAL_STORAGE_KEY);
    localStorage.removeItem(UserSessionImpl.AUTH_CREDENTIALS_LOCAL_STORAGE_KEY);
  }

}