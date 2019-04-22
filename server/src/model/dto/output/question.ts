import { Quiz } from "./quiz";
import { QuestionType } from "../../entity/question";
import { Suggestion } from "./suggestion";
import { Entity } from "../../entity";

export class Question {

  public id: string;
  public content: string;
  public quizId: string;
  public type: QuestionType;

  constructor()
  constructor(question: Entity.Question)
  constructor(question?: Entity.Question) {
    if (question) {
      this.id = question.id;
      this.content = question.content;
      this.quizId = question.quizId;
      this.type = question.type;
    }
  }

}