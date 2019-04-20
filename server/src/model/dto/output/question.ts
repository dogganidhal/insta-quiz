import { Quiz } from "./quiz";
import { QuestionType } from "../../entity/question";
import { Suggestion } from "./suggestion";
import { Answer } from "./answer";


/*
type Question {
  id: ID!
  content: String!
  quizId: ID!
  quiz: Quiz!
  type: QuestionType!
  suggestions: [Suggestion]!
  answers: [Answer]!
}
*/

export class Question {

  public id: string;
  public content: string;
  public quizId: string;
  public quiz: Quiz;
  public type: QuestionType;
  public suggestions: Suggestion[];
  public answers: Answer[];

}