import { IUserAction } from ".";
import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { AppState } from "../../state/app-state";

export type CreateSuggestionAction = CreateSuggestionSetContentAction 
  | CreateSuggestionSetImageUrlAction;

export interface CreateSuggestionSetContentAction extends IUserAction {
  type: "CREATE_SUGGESTION_SET_CONTENT";
  content?: string;
}

export interface CreateSuggestionSetImageUrlAction extends IUserAction {
  type: "CREATE_SUGGESTION_SET_IMAGE_URL";
  imageUrl: string;
}

export function onSuggestionContentInputChanged(input: string): ThunkAction<void, AppState, Container, CreateSuggestionAction> {
  return dispatch => {
    dispatch({
      type: "CREATE_SUGGESTION_SET_CONTENT",
      content: input
    })
  };
}