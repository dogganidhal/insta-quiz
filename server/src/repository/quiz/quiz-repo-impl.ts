import { IQuizRepository } from ".";
import { Quiz } from "../../model/entity/quiz";
import { injectable, inject } from "inversify";
import { User } from "../../model/entity/user";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";


@injectable()
export class QuizRepositoryImpl implements IQuizRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getQuizzesOfUser(user: User): Promise<Quiz[]> {
    let repository = this.connection.getRepository(Quiz);
    return await repository.find({author: user});
  }

  public async createQuiz(): Promise<Quiz> {
    throw new Error("Not implemented");
  }

}