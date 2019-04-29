import { IUserAction } from ".";
import { Quiz } from "../../model/quiz";
import { Location } from "history";
import { Container } from "inversify";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../state/app-state";
import { parse } from "querystring";
import { Types } from "../../constants/types";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";


export type QuizCorrectionAction = QuizCorrectionSetLoadingAction
  | QuizCorrectionSetQuizAction;

interface QuizCorrectionSetLoadingAction extends IUserAction {
  type: "QUIZ_CORRECTION_SET_LOADING";
  isLoading: boolean;
}


interface QuizCorrectionSetQuizAction extends IUserAction {
  type: "QUIZ_CORRECTION_SET_QUIZ";
  quiz: Quiz;
}

type QuizCorrectionAsyncAction = ThunkAction<void, AppState, Container, QuizCorrectionAction>;

export function loadQuiz(location: Location): QuizCorrectionAsyncAction {
  return async (dispatch, getState, container) => {
    dispatch({ type: "QUIZ_CORRECTION_SET_LOADING", isLoading: true });
    let queryString = location.search.replace("?", "");
    let id = <string>parse(queryString).id;
    let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
    let response = await client.query<{ quiz: Quiz[] }>({
      query: gql`
        query getQuizCorrectionById($id: ID!){
          quiz(id: $id) {
            id
            title
            description
            deadline
            questions {
              id
              content
              type
              suggestions {
                id
                content
                imageUrl
                isCorrect
              }
            }
          }
        }
      `,
      variables: { id: id }
    });
    if (response.errors || response.data.quiz.length === 0) {
      // TODO: Handle errors
    }
    dispatch({ type: "QUIZ_CORRECTION_SET_LOADING", isLoading: false });
    dispatch({ type: "QUIZ_CORRECTION_SET_QUIZ", quiz: response.data.quiz[0] });
  }
}