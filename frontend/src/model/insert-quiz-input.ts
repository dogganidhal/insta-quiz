import { InsertQuestionInput } from "./insert-question-input";



export interface InsertQuizInput {
  title: string;
  description?: string;
  deadline?: Date;
  questions: InsertQuestionInput[];
}