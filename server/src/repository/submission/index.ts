import { Entity } from "../../model/entity";


export interface ISubmissionRepository {
  getSubmissionById(id: string): Promise<Entity.Submission>;
  getSubmissionsByUserId(userId: string): Promise<Entity.Submission[]>;
  getAnswersBySubmissionId(submissionId: string): Promise<Entity.Answer[]>;
}