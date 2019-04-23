import { User } from "../model/user";
import { AuthCredentials } from "../model/auth-credentials";


export interface AuthState {
  readonly isLoading: boolean;
  readonly isLogged: boolean;
  readonly user?: User;
  readonly authCredentials?: AuthCredentials;
}

export let initialAuthState: AuthState = {
  isLoading: false,
  isLogged: false
} 