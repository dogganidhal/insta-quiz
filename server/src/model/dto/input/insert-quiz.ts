import { InsertQuestionInput } from "./insert-question";

export interface InsertQuizInput {
  title: string;
  description?: string;
  deadline?: Date;
  questions: [InsertQuestionInput];
}