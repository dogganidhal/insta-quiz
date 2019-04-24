import { Quiz } from "../model/quiz";
import { Submission } from "../model/submission";


export interface UserQuizzesState {
  readonly isLoading: boolean;
  readonly quizzes: Quiz[];
}

export interface UserSubmissionsState {
  readonly isLoading: boolean;
  readonly submissions: Submission[];
}

export interface QuizResponseState {

}

export interface QuizResultState {

}

export interface UserState {
  readonly userQuizzes: UserQuizzesState;
  readonly userSubmissions: UserSubmissionsState
  readonly quizResponse: QuizResponseState;
  readonly quizResult: QuizResultState;
}