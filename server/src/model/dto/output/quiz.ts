import { User } from "./user";
import { Question } from "./question";
import { QuizSubmission } from "./quiz-submission";
import { Entity } from "../../entity";

/*
  type Quiz {
  id: ID!
  title: String!
  description: String!
  authorId: ID!
  author: User!
  deadline: GraphQLDateTime
  questions: [Question]!
  submissions: [QuizSubmission]
}
*/

export class Quiz {

  public id: string;
  public title: string;
  public description: string;
  public authorId: string;
  public author: User;
  public deadline?: Date;
  public questions: Question[];
  public submissions: QuizSubmission[];

  constructor(quiz: Entity.Quiz) {
    this.id = quiz.id;
    this.title = quiz.title;
    this.authorId = quiz.authorId;
    this.description = quiz.description;
    this.deadline = quiz.deadline;
    if (quiz.author) {
      this.author = new User(quiz.author);
    }
  }

}