import { Entity } from "../../model/entity";
import { Dto } from "../../model/dto";


export interface ISubmissionManager {
  submit(submissionData: Dto.Input.InsertSubmissionInput, user: Entity.User): Promise<Dto.Output.Submission>;
}