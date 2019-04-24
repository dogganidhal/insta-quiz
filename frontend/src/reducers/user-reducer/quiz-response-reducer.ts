import { QuizResponseState } from "../../state/user-state";
import { IUserAction } from "../../actions/user";

let initialState: QuizResponseState = {
  
}

export function quizResponseReducer(state: QuizResponseState = initialState, action: IUserAction): QuizResponseState {
  return state;
}