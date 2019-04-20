import { Quiz } from "./quiz";
import { QuestionType } from "../../entity/question";
import { Suggestion } from "./suggestion";
import { Answer } from "./answer";
import { Entity } from "../../entity";


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

  constructor()
  constructor(question: Entity.Question)
  constructor(question?: Entity.Question) {
    if (question) {
      this.id = question.id;
      this.content = question.content;
      this.quizId = question.quizId;
      this.type = question.type;
      if (question.quiz) {
        this.quiz = new Quiz(question.quiz);
      }
    }
  }

}