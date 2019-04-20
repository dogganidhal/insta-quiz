import { User } from "./user";
import { Quiz } from "./quiz";
import { Entity } from "../../entity";
import { Answer } from "./answer";


/*
type QuizSubmission {
  id: ID!
  userId: ID!
  user: User!
  quizId: ID!
  quiz: Quiz!
  questionSubmissions: [QuizQuestionSubmission]
}
*/

export class Submission {

  public id: string;
  public userId: string;
  public user: User;
  public quizId: string;
  public quiz: Quiz;
  public answers: Answer[];

  constructor(submission: Entity.Submission)
  constructor(submission: Entity.Submission, answers?: Entity.Answer[]) {
    this.id = submission.id;
    this.userId = submission.userId;
    this.quizId = submission.quizId;
    if (submission.user) {
      this.user = new User(submission.user);
    }
    if (submission.quiz) {
      this.quiz = new Quiz(submission.quiz);
    }
    if (answers) {
      this.answers = answers.map(qs => new Answer(qs));
    }
  }

}