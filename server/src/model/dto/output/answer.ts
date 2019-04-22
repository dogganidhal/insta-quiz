import { Question } from "./question";
import { Suggestion } from "./suggestion";
import { Submission } from "./submission";
import { Entity } from "../../entity";


export class Answer {

  public id: string;
  public content: string;
  public submissionId: string;
  public suggestionId: string;
  public questionId: string;

  constructor()
  constructor(answer: Entity.Answer)
  constructor(answer?: Entity.Answer) {
    if (answer) {
      this.id = answer.id;
      this.content = answer.content;
      this.submissionId = answer.submissionId;
      this.suggestionId = answer.suggestionId;
      this.questionId = answer.questionId;
    }
  }
  

}