import { Quiz } from "../../model/quiz";


export interface UserQuizzesState {
  readonly isLoading: boolean;
  readonly quizzes: Quiz[];
  readonly isShareDialogOpen: boolean;
  readonly selectedQuizToShareUrl?: string;
}