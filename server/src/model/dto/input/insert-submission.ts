import { InsertAnswerInput } from "./insert-answer";


export class InsertSubmissionInput {

  public quizId: string;
  public answers: InsertAnswerInput[];

}