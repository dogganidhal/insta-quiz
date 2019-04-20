import { User } from "./user";
import { Quiz } from "./quiz";
import { QuizQuestionSubmission } from "./quiz-question-submission";
import { Entity } from "../../entity";


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

export class QuizSubmission {

  public id: string;
  public userId: string;
  public user: User;
  public quizId: string;
  public quiz: Quiz;
  public questionSubmissions: QuizQuestionSubmission[];

  constructor(submission: Entity.QuizSubmission)
  constructor(submission: Entity.QuizSubmission, questionSubmissions?: Entity.QuizQuestionSubmission[]) {
    this.id = submission.id;
    this.userId = submission.userId;
    this.quizId = submission.quizId;
    if (submission.user) {
      this.user = new User(submission.user);
    }
    if (submission.quiz) {
      this.quiz = new Quiz(submission.quiz);
    }
    if (questionSubmissions) {
      this.questionSubmissions = questionSubmissions.map(qs => new QuizQuestionSubmission(qs));
    }
  }

}