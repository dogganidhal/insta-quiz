import { UserQuizzesState } from "../../state/user-state/user-quizzes-state";
import { UserQuizzesAction } from "../../actions/user/user-quizzes";


let initialState: UserQuizzesState = {
  isLoading: false,
  quizzes: [],
  isShareDialogOpen: false
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
    case "SET_SHARE_DIALOG_OPEN":
      return {
        ...state,
        isShareDialogOpen: action.open
      };
    case "SET_QUIZ_TO_SHARE_URL":
      return {
        ...state,
        selectedQuizToShareUrl: action.quizToShareUrl
      };
  }
  return state;
}