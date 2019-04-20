import { QuizSubmission } from "./quiz-submission";
import { Entity } from "../../entity";


/*
type QuizQuestionSubmission {
  id: ID!
  submissionId: ID!
  submission: QuizSubmission!
  content: String
}
*/

export class QuizQuestionSubmission {

  public id: string;
  public submissionId: string;
  public submission: QuizSubmission;
  public content?: string;

  constructor(qs: Entity.QuizQuestionSubmission) {
    this.id = qs.id;
    this.submissionId = qs.submissionId;
    this.content = qs.content;
    if (qs.submission) {
      this.submission = new QuizSubmission(qs.submission);
    }
  }

}