import { Entity } from "../../model/entity";


export interface ISubmissionRepository {
  getAnswersByQuestionId(questionId: string): Promise<Entity.Answer[]>;
  createSubmission(submission: Entity.Submission): Promise<Entity.Submission>;
  getSubmissionById(id: string, relations?: string[]): Promise<Entity.Submission>;
  getSubmissionsByUserId(userId: string): Promise<Entity.Submission[]>;
  getAnswersBySubmissionId(submissionId: string): Promise<Entity.Answer[]>;
  saveAnswers(answers: Entity.Answer[]): Promise<void>;
}