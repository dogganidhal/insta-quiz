import { Quiz } from "../../model/quiz";
import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Types } from "../../constants/types";
import { IUserAction } from ".";
import { UserQuizzesState } from "../../state/user-state/user-quizzes-state";
import { AppState } from "../../state/app-state";


export type UserQuizzesAction = SetUserQuizzesLoadingAction 
  | SetUserQuizzesInAction
  | SetShareDialogOpenAction
  | SetQuizToShareUrlAction;

interface SetUserQuizzesLoadingAction extends IUserAction {
  type: "SET_USER_QUIZZES_LOADING";
  isLoading: boolean;
}

interface SetUserQuizzesInAction extends IUserAction {
  type: "SET_USER_QUIZZES";
  quizzes: Quiz[];
}

interface SetShareDialogOpenAction extends IUserAction {
  type: "SET_SHARE_DIALOG_OPEN",
  open: boolean;
}

interface SetQuizToShareUrlAction extends IUserAction {
  type: "SET_QUIZ_TO_SHARE_URL",
  quizToShareUrl: string;
}

type UserQuizzesAsyncAction = ThunkAction<void, AppState, Container, UserQuizzesAction>;

export function copyLinkToClipboard(): UserQuizzesAsyncAction {
  return (dispatch, getState) => {
    let { selectedQuizToShareUrl } = getState().user.userQuizzes;
    if (selectedQuizToShareUrl) {
      navigator.clipboard.writeText(selectedQuizToShareUrl);
    }
  }
}

export function openShareDialog(quizId: string): UserQuizzesAsyncAction {
  return dispatch => {
    dispatch({ type: "SET_SHARE_DIALOG_OPEN", open: true });
    dispatch({ type: "SET_QUIZ_TO_SHARE_URL", quizToShareUrl: `${window.location.protocol}//${window.location.host}/quiz/answer?id=${quizId}`});
  }
}

export function closeShareDialog(): UserQuizzesAction {
  return {
    type: "SET_SHARE_DIALOG_OPEN",
    open: false
  };
}

export function loadUserQuizzes(): UserQuizzesAsyncAction {
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