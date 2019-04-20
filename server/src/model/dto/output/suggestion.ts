import { Question } from "./question";


/*
type Suggestion {
  id: ID!
  questionId: ID!
  question: Question!
  content: String
  imageUrl: String
}
*/

export class Suggestion {

  public id: string;
  public questionId: string;
  public question: Question;
  public content?: string;
  public imageUrl?: string;

}