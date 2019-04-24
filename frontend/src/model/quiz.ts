import { User } from "./user";
import { Question } from "./question";
import { Submission } from "./submission";


export enum QuizType {
  MCQ = "MCQ",
  MIXED = "MIXED"
}


export interface Quiz {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly type: QuizType;
  readonly authorId: string;
  readonly author: User;
  readonly deadline?: string;
  readonly questions: Question[];
  readonly submissions: Submission[];
}