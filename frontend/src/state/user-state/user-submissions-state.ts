import { Submission } from "../../model/submission";


export interface UserSubmissionsState {
  readonly isLoading: boolean;
  readonly submissions: Submission[];
}