import { QuizResultState } from "../../state/user-state/quiz-result-state";
import { QuizResultsAction } from "../../actions/user/quiz-results";

let initialState: QuizResultState = {
  isLoading: true
};

export function quizResultReducer(state: QuizResultState = initialState, action: QuizResultsAction): QuizResultState {
  switch(action.type) {
    case "QUIZ_RESULTS_SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "QUIZ_RESULTS_SET_QUIZ":
      return {
        ...state,
        quiz: action.quiz
      };
  }
  return state;
}