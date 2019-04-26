import { CreateQuestionState } from "../../state/user-state/create-quiz-state/create-question-state";
import { CreateQuestionAction } from "../../actions/user/create-question";
import { createSuggestionReducer } from "./create-suggestion-reducer";


export function createQuestionReducer(state: CreateQuestionState, action: CreateQuestionAction): CreateQuestionState {
  switch (action.type) {
    case "CREATE_QUESTION_ADD_SUGGESTION": 
      let suggestions = state.suggestions ? state.suggestions : [];
      return {
        ...state,
        suggestions: [...suggestions, action.suggestion] 
      };
    case "CREATE_QUESTION_SET_CONTENT":
      return {
        ...state,
        content: action.content
      };
    case "CREATE_QUESTION_SET_POINTS":
      return {
        ...state,
        points: action.points
      };
    case "CREATE_QUESTION_SET_TYPE":
      return {
        ...state,
        type: action.questionType
      };
    case "CREATE_SUGGESTION_SET_CONTENT":
    case "CREATE_SUGGESTION_SET_IMAGE_URL":
    case "CREATE_SUGGESTION_SET_IS_CORRECT":
      return {
        ...state,
        createSuggestion: createSuggestionReducer(state.createSuggestion, action)
      };
  }
  return state;
}