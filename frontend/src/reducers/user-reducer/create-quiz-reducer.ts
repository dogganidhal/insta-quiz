import { CreateQuizAction } from "../../actions/user/create-quiz";
import { CreateQuizState } from "../../state/user-state/create-quiz-state";
import { createQuestionReducer } from "./create-quiz-reducer/create-question-reducer";


let initialState: CreateQuizState = {
  questions: [],
  success: false
};

export function createQuizReducer(state: CreateQuizState = initialState, action: CreateQuizAction): CreateQuizState {
  switch (action.type) {
    case "CREATE_QUIZ_ADD_QUESTION":
      return {
        ...state,
        createQuestion: action.createQuestion
      }
    case "CREATE_QUIZ_SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions
      }
    case "CREATE_QUIZ_SUCCESS":
      return {
        ...state,
        success: true
      };
    case "CREATE_QUIZ_SET_TITLE": 
      return {
        ...state,
        title: action.title
      };
    case "CREATE_QUIZ_SET_DESCRIPTION":
      return {
        ...state,
        description: action.description
      };
    case "CREATE_QUIZ_SET_DEADLINE":
      return {
        ...state,
        deadline: action.deadline
      };
    case "CREATE_QUESTION_SET_SUGGESTIONS":
    case "CREATE_QUESTION_ADD_SUGGESTION":
    case "CREATE_QUESTION_SET_CONTENT":
    case "CREATE_QUESTION_SET_POINTS":
    case "CREATE_QUESTION_SET_TYPE":
    case "CREATE_SUGGESTION_SET_CONTENT":
    case "CREATE_SUGGESTION_SET_IMAGE_URL":
      return {
        ...state,
        createQuestion: state.createQuestion ? createQuestionReducer(state.createQuestion!, action) : undefined
      }
  }
  return state;
}