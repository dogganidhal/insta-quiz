import { AuthState } from "./auth-state";
import { UiState } from "./ui-state";


export interface AppState {
  readonly auth: AuthState;
  readonly ui: UiState;
}