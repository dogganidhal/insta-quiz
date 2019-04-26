import { ThunkAction } from "redux-thunk";
import { UserSubmissionsState } from "../../state/user-state/user-submissions-state";
import { Container } from "inversify";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Types } from "../../constants/types";
import { IUserAction } from ".";
import { Submission } from "../../model/submission";


export type UserSubmissionsAction = SetUserSubmissionsLoadingAction | SetUserSubmissionsAction;

interface SetUserSubmissionsLoadingAction extends IUserAction {
  type: "SET_USER_SUBMISSIONS_LOADING";
  isLoading: boolean;
}

interface SetUserSubmissionsAction extends IUserAction {
  type: "SET_USER_SUBMISSIONS";
  submissions: Submission[];
}

export function loadUserSubmissions(): ThunkAction<void, UserSubmissionsState, Container, UserSubmissionsAction> {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SET_USER_SUBMISSIONS_LOADING", isLoading: true });
    let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
    let response = await client.query<{ me: { submissions: Submission[] } }>({
      query: gql`
        {
          me {
            submissions {
              id
              score {
                points
                totalPoints
              }
              quiz {
                id
                title
                description
                deadline
                submissions {
                  id
                }
              }
            } 
          }
        }
      `
    });
    if (response.errors) {
      // TODO: Handle errors
    }
    dispatch({ type: "SET_USER_SUBMISSIONS_LOADING", isLoading: false });
    dispatch({ type: "SET_USER_SUBMISSIONS", submissions: response.data.me.submissions });
  };
}