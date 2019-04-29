import { UserQuizzesState } from "./user-quizzes-state";
import { UserSubmissionsState } from "./user-submissions-state";
import { CreateQuizState } from "./create-quiz-state";
import { AnswerQuizState } from "./answer-quiz";
import { QuizCorrectionState } from "./quiz-correction-state";

export interface QuizResponseState {

}

export interface QuizResultState {

}

export interface UserState {
  readonly userQuizzes: UserQuizzesState;
  readonly userSubmissions: UserSubmissionsState;
  readonly createQuiz: CreateQuizState;
  readonly answerQuiz: AnswerQuizState;
  readonly quizResponse: QuizResponseState;
  readonly quizResult: QuizResultState;
  readonly quizCorrection: QuizCorrectionState;
}