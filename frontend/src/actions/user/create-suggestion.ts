import { IUserAction } from ".";
import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { CreateSuggestionState } from "../../state/user-state/create-quiz-state/create-suggestion-state";
import { AppState } from "../../state/app-state";

export type CreateSuggestionAction = CreateSuggestionSetContentAction 
  | CreateSuggestionSetImageUrlAction
  | CreateSuggestionSetIsCorrectAction;

export interface CreateSuggestionSetContentAction extends IUserAction {
  type: "CREATE_SUGGESTION_SET_CONTENT";
  content?: string;
}

export interface CreateSuggestionSetImageUrlAction extends IUserAction {
  type: "CREATE_SUGGESTION_SET_IMAGE_URL";
  imageUrl: string;
}

export interface CreateSuggestionSetIsCorrectAction extends IUserAction {
  type: "CREATE_SUGGESTION_SET_IS_CORRECT";
  isCorrect: boolean;
}

export function onSuggestionContentInputChanged(input: string): ThunkAction<void, AppState, Container, CreateSuggestionAction> {
  return dispatch => {
    dispatch({
      type: "CREATE_SUGGESTION_SET_CONTENT",
      content: input
    })
  };
}