import { AnswerQuizState } from "../../state/user-state";
import { AnswerQuizAction } from "../../actions/user/answer-quiz";

let initialState: AnswerQuizState = {
  isLoading: true
};

export function answerQuizReducer(state: AnswerQuizState = initialState, action: AnswerQuizAction): AnswerQuizState {


  return state;
}