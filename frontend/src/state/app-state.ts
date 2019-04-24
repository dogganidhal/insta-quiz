import { AuthState } from "./auth-state";
import { UserState } from "./user-state";


export interface AppState {
  readonly auth: AuthState;
  readonly user: UserState;
}