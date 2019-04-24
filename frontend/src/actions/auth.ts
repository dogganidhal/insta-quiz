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

interface SetAuthLoadingAction extends IAction {
  type: "SET_AUTH_LOADING";
  isLoading: boolean;
}

interface SetLoggedInAction extends IAction {
  type: "SET_LOGGED_IN";
  user: User;
  authCredentials: AuthCredentials;
}

interface SetLoggedOutAction extends IAction {
  type: "SET_LOGGED_OUT";
}

export function login(token: string): ThunkAction<void, AuthState, Container, AuthAction> {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SET_AUTH_LOADING", isLoading:true });
    let authCredentials = await getAuthCredentials(container, token);
    let userSession = container.get<IUserSession>(Types.IUserSession);
    userSession.saveAuthCredentials(authCredentials);
    let user = await getUser(container);
    userSession.saveUser(user);
    dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
    dispatch({
      type: "SET_LOGGED_IN",
      user,
      authCredentials
    })
  }
}

export function logout(): ThunkAction<void, AuthState, Container, AuthAction> {
  return async (dispatch, getState, container) => {
    let userSession = container.get<IUserSession>(Types.IUserSession);
    userSession.clear();
    dispatch({ type: "SET_LOGGED_OUT" });
  }
}

export function loadAuthState(): ThunkAction<void, AuthState, Container, AuthAction> {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SET_AUTH_LOADING", isLoading: true });
    let userSession = container.get<IUserSession>(Types.IUserSession);
    let authCredentials = userSession.authCredentials;
    if (authCredentials) {
      let user = await getUser(container);
      userSession.saveUser(user);
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      dispatch({
        type: "SET_LOGGED_IN",
        user,
        authCredentials
      });
    } else {
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      dispatch({ type: "SET_LOGGED_OUT" });
    }
  }
}

async function getAuthCredentials(container: Container, token: string): Promise<AuthCredentials> {
  let client = container.get<ApolloClient<{}>>(Types.ApolloClient);
  let response = await client.query<{ login: AuthCredentials }>({
    query: gql`
      query loginWithGoogleToken($token: String!) {
        login(token: $token) {
          accessToken
        }
      }
    `,
    variables: { token: token }
  });
  if (response.errors) {
    // TODO: handle errors
    console.log(response.errors);
  }
  return response.data.login;
}

async function getUser(container: Container): Promise<User> {
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
  return response.data.me;
}