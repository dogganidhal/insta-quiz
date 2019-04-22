import { Entity } from "../../model/entity";
import { Dto } from "../../model/dto";


export interface ISubmissionManager {
  getQuizResponsesOfSubmission(id: string): Promise<Dto.Output.QuizResponse[]>;
  submit(submissionData: Dto.Input.InsertSubmissionInput, user: Entity.User): Promise<Dto.Output.Submission>;
  calculateScore(submissionId: string): Promise<Dto.Output.Score>;
}