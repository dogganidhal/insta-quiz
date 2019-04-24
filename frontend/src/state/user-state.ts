import { Quiz } from "../model/quiz";


export interface UserQuizzesState {
  readonly isLoading: boolean;
  readonly quizzes: Quiz[];
}

export interface QuizResponseState {

}

export interface QuizResultState {

}

export interface UserState {
  readonly userQuizzes: UserQuizzesState;
  readonly quizResponse: QuizResponseState;
  readonly quizResult: QuizResultState;
}