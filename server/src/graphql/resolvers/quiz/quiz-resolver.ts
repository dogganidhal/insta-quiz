import { injectable, inject } from "inversify";
import { InsertQuizInput } from "../../../model/dto/input/insert-quiz";
import { Types } from "../../../constants/types";
import { IQuizRepository } from "../../../repository/quiz";
import { User } from "../../../model/entity/user";
import { IQuizResolver, IQuizQueries, IQuizMutations } from ".";


@injectable()
export class QuizResolver implements IQuizResolver {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  
  public get queries(): IQuizQueries {
    return {
      myQuizzes: async (parent, args, context) => {

        let user: User = context.user;
        let quizzes = await this.quizRepository.getQuizzesOfUser(user);
        return quizzes;
        
      }
    };
  };

  public get mutations(): IQuizMutations {
    return {
      createQuiz: async (parent, args: { quizData: InsertQuizInput }, context) => {
        
        return await this.quizRepository.createQuiz();

      }
    };
  };

}