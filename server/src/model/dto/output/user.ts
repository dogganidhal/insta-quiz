import { Entity } from "../../entity";
import { QuizSubmission } from "./quiz-submission";


/*
type User {
  id: ID!
  fullName: String
  email: String!
  quizSubmissions: [QuizSubmission]
}
*/

export class User {

  public id: string;
  public fullName: string;
  public email: string;
  public quizSubmissions?: QuizSubmission[];

  constructor(user: Entity.User) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.email = user.email;
  }

}