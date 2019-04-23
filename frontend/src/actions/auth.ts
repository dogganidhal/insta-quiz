import { IAction } from "./base";
import { ThunkAction } from "redux-thunk";
import { AuthState } from "../state/auth-state";
import { User } from "../model/user";
import { AuthCredentials } from "../model/auth-credentials";
import { Container } from "inversify";
import { IUserSession } from "../session/user";
import { Types } from "../constants/types";
import { ApolloClient, gql } from "apollo-boost";

export type AuthAction = SetAuthLoadingAction | SetLoggedInAction | SetLoggedOutAction;

export interface SetAuthLoadingAction extends IAction {
  type: "SET_AUTH_LOADING";
  isLoading: boolean;
}

export interface SetLoggedInAction extends IAction {
  type: "SET_LOGGED_IN";
  user: User;
  authCredentials: AuthCredentials;
}

export interface SetLoggedOutAction extends IAction {
  type: "SET_LOGGED_OUT";
}

export function loadApp(): ThunkAction<void, AuthState, Container, AuthAction> {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SET_AUTH_LOADING", isLoading: true });
    let userSession = container.get<IUserSession>(Types.IUserSession);
    let authCredentials = userSession.authCredentials;
    if (authCredentials) {
      let client = container.get<ApolloClient<{}>>(Types.ApolloClient);
      let response = await client.query<{ me: User }>({
        query: gql`
          {
            me {
              id
              fullName
              email
            }
          }
        `});
      if (response.errors) {
        // TODO: handle errors
        console.log(response.errors);
      }
      userSession.saveUser(response.data.me);
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      dispatch({
        type: "SET_LOGGED_IN",
        user: response.data.me,
        authCredentials
      });
    } else {
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      dispatch({ type: "SET_LOGGED_OUT" });
    }
  }
}