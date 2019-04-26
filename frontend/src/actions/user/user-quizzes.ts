import { Quiz } from "../../model/quiz";
import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Types } from "../../constants/types";
import { IUserAction } from ".";
import { UserQuizzesState } from "../../state/user-state/user-quizzes-state";


export type UserQuizzesAction = SetUserQuizzesLoadingAction | SetUserQuizzesInAction;

interface SetUserQuizzesLoadingAction extends IUserAction {
  type: "SET_USER_QUIZZES_LOADING";
  isLoading: boolean;
}

interface SetUserQuizzesInAction extends IUserAction {
  type: "SET_USER_QUIZZES";
  quizzes: Quiz[];
}

export function loadUserQuizzes(): ThunkAction<void, UserQuizzesState, Container, UserQuizzesAction> {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SET_USER_QUIZZES_LOADING", isLoading: true });
    let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
    let response = await client.query<{ quiz: Quiz[] }>({
      query: gql`
        {
          quiz {
            id
            title
            description
            deadline
            submissions {
              id
            }
          }
        }
      `
    });
    if (response.errors) {
      // TODO: Handle errors
    }
    dispatch({ type: "SET_USER_QUIZZES_LOADING", isLoading: false });
    dispatch({ type: "SET_USER_QUIZZES", quizzes: response.data.quiz });
  };
}