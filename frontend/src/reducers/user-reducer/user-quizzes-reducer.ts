import { UserQuizzesState } from "../../state/user-state";
import { UserQuizzesAction } from "../../actions/user/user-quizzes";


let initialState: UserQuizzesState = {
  isLoading: false,
  quizzes: []
};

export function userQuizzesReducer(state: UserQuizzesState = initialState, action: UserQuizzesAction): UserQuizzesState {
  switch (action.type) {
    case "SET_USER_QUIZZES":
      return {
        ...state,
        quizzes: action.quizzes
      };
    case "SET_USER_QUIZZES_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
  }
  return state;
}