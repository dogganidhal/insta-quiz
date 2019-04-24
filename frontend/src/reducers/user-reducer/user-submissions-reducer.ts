import { UserSubmissionsState } from "../../state/user-state";
import { UserSubmissionsAction } from "../../actions/user/user-submissions";

let initialState: UserSubmissionsState = {
  isLoading: false,
  submissions: []
};

export function userSubmissionsReducer(state: UserSubmissionsState = initialState, action: UserSubmissionsAction): UserSubmissionsState {
  switch (action.type) {
    case "SET_USER_SUBMISSIONS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "SET_USER_SUBMISSIONS": 
      return {
        ...state,
        submissions: action.submissions
      };
  }
  return state;
}