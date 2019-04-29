import { QuizCorrectionState } from "../../state/user-state/quiz-correction-state";
import { QuizCorrectionAction } from "../../actions/user/quiz-correction";


let initalState: QuizCorrectionState = {
  isLoading: true
}


export function quizCorrectionReducer(state: QuizCorrectionState = initalState, action: QuizCorrectionAction): QuizCorrectionState {
  switch(action.type) {
    case "QUIZ_CORRECTION_SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "QUIZ_CORRECTION_SET_QUIZ":
      return {
        ...state,
        quiz: action.quiz
      }
  }
  return state;
}