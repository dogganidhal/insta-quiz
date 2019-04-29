import { InsertAnswerInput } from "./insert-answer";
import { InsertQuestionSubmissionInput } from "./insert-question-submission";


export interface InsertSubmissionInput {

  readonly quizId: string;
  readonly questions: InsertQuestionSubmissionInput[];

}