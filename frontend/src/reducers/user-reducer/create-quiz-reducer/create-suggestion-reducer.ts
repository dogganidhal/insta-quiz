import { CreateSuggestionState } from "../../../state/user-state/create-quiz-state/create-suggestion-state";
import { CreateSuggestionAction } from "../../../actions/user/create-quiz/create-suggestion";



export function createSuggestionReducer(state: CreateSuggestionState, action: CreateSuggestionAction): CreateSuggestionState {
  switch (action.type) {
    case "CREATE_SUGGESTION_SET_CONTENT":
     return {
       ...state,
       content: action.content || ""
     };
    case "CREATE_SUGGESTION_SET_IMAGE_URL":
     return {
       ...state,
       imageUrl: action.imageUrl
     };
  }
  return state;
}