import { IQuizRepository } from ".";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";
import { Entity } from "../../model/entity";


@injectable()
export class QuizRepositoryImpl implements IQuizRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getQuizzesOfUser(userId: string): Promise<Entity.Quiz[]> {
    let repository = this.connection.getRepository(Entity.Quiz);
    return await repository.find({ authorId: userId });
  }

  public async getQuizSubmissionForUser(userId: string): Promise<Entity.QuizSubmission[]> {
    let repository = this.connection.getRepository(Entity.QuizSubmission);
    return await repository.find({ userId: userId });
  }

  public async getQuizById(quizId: string): Promise<Entity.Quiz> {
    let repository = this.connection.getRepository(Entity.Quiz);
    return await repository.findOne({ id: quizId });
  }

  public async createQuiz(): Promise<Entity.Quiz> {
    throw new Error("Not implemented");
  }

}