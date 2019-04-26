import { IUserAction } from ".";
import { InsertSuggestionInput } from "../../model/insert-suggestion-input";
import { QuestionType } from "../../model/question";
import { ThunkAction } from "redux-thunk";
import { CreateQuestionState } from "../../state/user-state/create-quiz-state/create-question-state";
import { Container } from "inversify";
import { CreateSuggestionAction } from "./create-suggestion";
import { AppState } from "../../state/app-state";

export type CreateQuestionAction = CreateQuestionAddSuggestionAction 
  | CreateQuestionSetContentAction
  | CreateQuestionSetTypeAction
  | CreateQuestionSetPointsAction
  | CreateSuggestionAction;

export interface CreateQuestionAddSuggestionAction extends IUserAction {
  type: "CREATE_QUESTION_ADD_SUGGESTION";
  suggestion: InsertSuggestionInput;
}

export interface CreateQuestionSetContentAction extends IUserAction {
  type: "CREATE_QUESTION_SET_CONTENT";
  content: string;
}

export interface CreateQuestionSetTypeAction extends IUserAction {
  type: "CREATE_QUESTION_SET_TYPE";
  questionType: QuestionType;
}

export interface CreateQuestionSetPointsAction extends IUserAction {
  type: "CREATE_QUESTION_SET_POINTS";
  points: number;
}

export function addSuggestion(): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch, getState) => {
    let { createQuestion } = getState().user.createQuiz;
    if (createQuestion) {
      dispatch({
        type: "CREATE_QUESTION_ADD_SUGGESTION",
        suggestion: {
          content: createQuestion.createSuggestion.content,
          imageUrl: createQuestion.createSuggestion.imageUrl,
          isCorrect: createQuestion.createSuggestion.isCorrect
        }
      });
      dispatch({
        type: "CREATE_SUGGESTION_SET_CONTENT",
        content: undefined
      });
    }
  };
}

export function onQuestionContentInputChanged(input: string): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return dispatch => {
    dispatch({ type: "CREATE_QUESTION_SET_CONTENT", content: input });
  };
}

export function setQuestionType(type: QuestionType): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch) => {
    dispatch({ type: "CREATE_QUESTION_SET_TYPE", questionType: type });
  };
}

export function setQuestionPoints(points: number): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch) => {
    dispatch({ type: "CREATE_QUESTION_SET_POINTS", points: points });
  };
}