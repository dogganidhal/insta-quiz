import { Question } from "./question";
import { Suggestion } from "./suggestion";


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
  public questionId: string;
  public question: Question;
  public suggestionId: string;
  public suggestion: Suggestion;

}