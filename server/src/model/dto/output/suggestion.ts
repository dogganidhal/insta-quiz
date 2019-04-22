import { Question } from "./question";
import { Entity } from "../../entity";


export class Suggestion {

  public id: string;
  public questionId: string;
  public content?: string;
  public imageUrl?: string;

  constructor()
  constructor(suggestion: Entity.Suggestion)
  constructor(suggestion?: Entity.Suggestion) {
    if (suggestion) {
      this.id = suggestion.id;
      this.content = suggestion.content;
      this.imageUrl = suggestion.imageUrl;
      this.questionId = suggestion.questionId;
    }
  }

}