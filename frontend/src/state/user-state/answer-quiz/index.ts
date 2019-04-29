import { AnswerQuestionState } from "./answer-question-state";
import { Quiz } from "../../../model/quiz";


export interface AnswerQuizState {
  isLoading: boolean;
  quiz?: Quiz;
  questions: AnswerQuestionState[];
}