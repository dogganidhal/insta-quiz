import { InsertAnswerInput } from "./insert-answer";
import { InsertQuestionSubmissionInput } from "./insert-question-submission";


export class InsertSubmissionInput {

  public quizId: string;
  public questions: InsertQuestionSubmissionInput[];

}