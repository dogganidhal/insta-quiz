import { User } from "./user";
import { Question } from "./question";
import { Submission } from "./submission";
import { Entity } from "../../entity";

export class Quiz {

  public id: string;
  public title: string;
  public description: string;
  public authorId: string;
  public deadline?: Date;

  constructor()
  constructor(quiz: Entity.Quiz)
  constructor(quiz?: Entity.Quiz) {
    if (quiz) {
      this.id = quiz.id;
      this.title = quiz.title;
      this.authorId = quiz.authorId;
      this.description = quiz.description;
      this.deadline = quiz.deadline;
    }
  }

}