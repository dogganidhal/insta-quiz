import { IUserAction } from ".";
import { Location } from "history";
import { Quiz } from "../../model/quiz";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../state/app-state";
import { Container } from "inversify";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Types } from "../../constants/types";
import { parse } from "querystring";

export type QuizResultsAction = QuizResultsSetLoadingAction
  | QuizResultsSetQuizAction;

interface QuizResultsSetLoadingAction extends IUserAction {
  type: "QUIZ_RESULTS_SET_LOADING",
  isLoading: boolean;
}

interface QuizResultsSetQuizAction extends IUserAction {
  type: "QUIZ_RESULTS_SET_QUIZ",
  quiz: Quiz;
}

type QuizResultsAsyncAction = ThunkAction<void, AppState, Container, QuizResultsAction>;

export function loadQuizResults(location: Location): QuizResultsAsyncAction {
  return async (dispatch, getState, container) => {
    dispatch({ type: "QUIZ_RESULTS_SET_LOADING", isLoading: true });
    let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
    let queryString = location.search.replace("?", "");
    let id = <string>parse(queryString).id;
    let response = await client.query<{ quiz: Quiz[] }>({
      query: gql`
        query getQuizResultsById($id: ID!) {
          quiz(id: $id) {
            id
            title
            submissions {
              user {
                fullName
              }
              score {
                points
                totalPoints
              }
            }
          }
        }
      `,
      variables: { id }
    });
    if (response.errors || response.data.quiz.length === 0) {
      // TODO: Handle error
    }
    dispatch({ type: "QUIZ_RESULTS_SET_LOADING", isLoading: false });
    dispatch({ type: "QUIZ_RESULTS_SET_QUIZ", quiz: response.data.quiz[0] });
  }
}