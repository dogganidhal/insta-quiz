import { injectable, inject } from "inversify";
import { Types } from "../../../constants/types";
import { IQuizRepository } from "../../../repository/quiz";
import { IQuizResolver, IQuizQueries, IQuizMutations, IQuizTypeResolver, IQuizSubmissionTypeResolver } from ".";
import { Dto } from "../../../model/dto";
import { Entity } from "../../../model/entity";
import { IUserRepository } from "../../../repository/user";


@injectable()
export class QuizResolver implements IQuizResolver {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;
  
  public get queries(): IQuizQueries {
    return {
      myQuizzes: async (parent, args, context) => {

        let user: Entity.User = context.user;
        let quizzes = await this.quizRepository.getQuizzesOfUser(user.id);
        return quizzes.map(quiz => new Dto.Output.Quiz(quiz));
        
      }
    };
  };

  public get mutations(): IQuizMutations {
    return {
      createQuiz: async (parent, args: { quizData: Dto.Input.InsertQuizInput }, context) => {
        
        let quiz = await this.quizRepository.createQuiz();
        return new Dto.Output.Quiz(quiz);

      }
    };
  };

  public get Quiz(): IQuizTypeResolver {
    return {
      author: async (quiz: Dto.Output.Quiz) => {
        let user = await this.userRepository.getUserById(quiz.authorId);
        return new Dto.Output.User(user);
      },
      questions: (quiz: Dto.Output.Quiz) => {
        throw new Error("Not implemented");
      },
      submissions: (quiz: Dto.Output.Quiz) => {
        throw new Error("Not implemented");
      }
    };
  };

  public get QuizSubmission(): IQuizSubmissionTypeResolver {
    return {
      user: async (submission: Dto.Output.QuizSubmission) => {
        let user = await this.userRepository.getUserById(submission.userId);
        return new Dto.Output.User(user);
      },
      quiz: async (submission: Dto.Output.QuizSubmission) => {
        let quiz = await this.quizRepository.getQuizById(submission.quizId);
        return new Dto.Output.Quiz(quiz);
      }
    };
  }

}