import { Quiz } from "./quiz";
import { Suggestion } from "./suggestion";
import { Answer } from "./answer";


export enum QuestionType {
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTI_CHOICE = "MULTI_CHOICE",
  INPUT = "INPUT"
}

export interface Question {
  readonly id: string;
  readonly content: string;
  readonly quizId: string;
  readonly quiz: Quiz;
  readonly type: QuestionType;
  readonly suggestions: Suggestion[];
  readonly answers: Answer[];
}