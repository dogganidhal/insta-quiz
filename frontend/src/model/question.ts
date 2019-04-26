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

export function questionTypeFromrString(str: string): QuestionType {
  switch (str) {
    case "SINGLE_CHOICE":
      return QuestionType.SINGLE_CHOICE;
    case "MULTI_CHOICE":
      return QuestionType.MULTI_CHOICE;
    case "INPUT":
      return QuestionType.INPUT;
  }
  return QuestionType.INPUT;
}

export function questionTypeToString(questionType: QuestionType): string {
  switch(questionType) {
    case QuestionType.INPUT:
      return "RÉPONSE LIBRE";
    case QuestionType.SINGLE_CHOICE:
      return "CHOIX UNIQUE";
    case QuestionType.MULTI_CHOICE:
      return "CHOIX MULTIPLE";
  }
}