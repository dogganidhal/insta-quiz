import { InsertAnswerInput } from "./insert-answer";



export interface InsertQuestionSubmissionInput {

  questionId: string;
  answers: InsertAnswerInput[];

}