import { CreateSuggestionAction } from "../../actions/user/create-suggestion";
import { CreateSuggestionState } from "../../state/user-state/create-quiz-state/create-suggestion-state";



export function createSuggestionReducer(state: CreateSuggestionState, action: CreateSuggestionAction): CreateSuggestionState {
  switch (action.type) {
    case "CREATE_SUGGESTION_SET_CONTENT":
     return {
       ...state,
       content: action.content
     };
    
  }
  console.log(action);
  return state;
}