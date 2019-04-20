import { Question } from "./question";
import { Suggestion } from "./suggestion";
import { Submission } from "./submission";
import { Entity } from "../../entity";


/*
type Answer {
  id: ID!
  questionId: ID!
  question: Question!
  suggestionId: ID!
  suggestion: Suggestion!
}
*/

export class Answer {

  public id: string;
  public content: string;
  public submissionId: string;
  public submission: Submission;
  public suggestionId: string;
  public suggestion: Suggestion;

  constructor()
  constructor(answer: Entity.Answer)
  constructor(answer?: Entity.Answer) {
    if (answer) {
      this.id = answer.id;
      this.content = answer.content;
      this.submissionId = answer.submissionId;
      this.suggestionId = answer.suggestionId;
      if (answer.submission) {
        this.submission = new Submission(answer.submission);
      }
      if (answer.suggestion) {
        this.suggestion = new Suggestion(answer.suggestion);
      }
    }
  }
  

}