import { Entity } from "../../entity";


export class Submission {

  public id: string;
  public userId: string;
  public quizId: string;

  constructor()
  constructor(submission: Entity.Submission)
  constructor(submission?: Entity.Submission) {
    if (submission) {
      this.id = submission.id;
      this.userId = submission.userId;
      this.quizId = submission.quizId;
    }
  }

}