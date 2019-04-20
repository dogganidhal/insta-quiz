import { IQuizRepository } from ".";
import { Quiz } from "../../model/entity/quiz";
import { injectable } from "inversify";
import { User } from "../../model/entity/user";


@injectable()
export class QuizRepositoryImpl implements IQuizRepository {
  
  public async getQuizzesOfUser(user: User): Promise<Quiz[]> {
    throw new Error("Method not implemented.");
  }

  public async createQuiz(): Promise<Quiz> {
    throw new Error("Not implemented");
  }

}