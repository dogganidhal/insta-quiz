import { QuizResultState } from "../../state/user-state";
import { IUserAction } from "../../actions/user";

let initialState: QuizResultState = {

}

export function quizResultReducer(state: QuizResultState = initialState, action: IUserAction): QuizResultState {
  return state;
}