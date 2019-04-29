import { IUserAction } from "../../actions/user";
import { QuizResultState } from "../../state/user-state/quiz-result-state";

let initialState: QuizResultState = {

}

export function quizResultReducer(state: QuizResultState = initialState, action: IUserAction): QuizResultState {
  return state;
}