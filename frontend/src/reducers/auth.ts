import { AuthState, initialAuthState } from "../state/auth-state";
import { AuthAction } from "../actions/auth";


export function authReducer(state: AuthState = initialAuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_AUTH_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLogged: true,
        user: action.user,
        authCredentials: action.authCredentials
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLogged: false,
        user: undefined,
        authCredentials: undefined,
      };
  }
  return state;
}