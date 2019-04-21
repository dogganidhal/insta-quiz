import { ISubmissionRepository } from ".";
import { injectable, inject } from "inversify";
import { Entity } from "../../model/entity";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";


@injectable()
export class SubmissionRepositoryImpl implements ISubmissionRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;

  public async getAnswersBySubmissionId(submissionId: string): Promise<Entity.Answer[]> {
    let repository = this.connection.getRepository(Entity.Answer);
    return repository.find({ submissionId: submissionId });
  }

  public async getSubmissionById(id: string): Promise<Entity.Submission> {
    let repository = this.connection.getRepository(Entity.Submission);
    return repository.findOne({ id: id });
  }

  public async getSubmissionsByUserId(userId: string): Promise<Entity.Submission[]> {
    let repository = this.connection.getRepository(Entity.Submission);
    return repository.find({ userId: userId });
  }

  public async createSubmission(submission: Entity.Submission): Promise<Entity.Submission> {
    let repository = this.connection.getRepository(Entity.Submission);
    return repository.save(submission);
  }

  public async saveAnswers(answers: Entity.Answer[]): Promise<void> {
    let repository = this.connection.getRepository(Entity.Answer);
    await repository.insert(answers);
  }

}