import { IUserAction } from ".";
import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { AppState } from "../../state/app-state";

export type AnswerQuizAction = AnswerQuizSetLoadingAction;

export interface AnswerQuizSetLoadingAction extends IUserAction {
  type: "ANSWER_QUIZ_SET_IS_LOADING";
  isLoading: boolean;
}
