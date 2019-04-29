import { AnswerQuizState } from "../../state/user-state/answer-quiz";
import { AnswerQuizAction } from "../../actions/user/answer-quiz";

let initialState: AnswerQuizState = {
  isLoading: true,
  questions: []
};

export function answerQuizReducer(state: AnswerQuizState = initialState, action: AnswerQuizAction): AnswerQuizState {
  switch(action.type) {
    case "ANSWER_QUIZ_SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "ANSWER_QUIZ_SET_QUIZ": 
      return {
        ...state,
        quiz: action.quiz
      };
    case "ANSWER_QUIZ_SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions
      };
  }
  return state;
}