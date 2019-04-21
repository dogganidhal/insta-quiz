import { injectable, inject } from "inversify";
import { Types } from "../../../constants/types";
import { IQuizRepository } from "../../../repository/quiz";
import { IQuizResolver, IQuizQueries, IQuizMutations, IQuizTypeResolver, IQuestionTypeResolver } from ".";
import { Dto } from "../../../model/dto";
import { Entity } from "../../../model/entity";
import { IUserRepository } from "../../../repository/user";
import { IQuizManager } from "../../../manager/quiz";
import { UnauthenticatedException, QuizNotFoundException, UnauthorizedException } from "../../../exceptions";


@injectable()
export class QuizResolverImpl implements IQuizResolver {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;
  @inject(Types.IQuizManager) private readonly quizManager: IQuizManager;
  
  public get queries(): IQuizQueries {
    return {
      Quiz: async (parent, args: { id?: string }, context) => {

        if (!context.user) 
          throw UnauthenticatedException;

        if (args.id) {
          let quiz = await this.quizRepository.getQuizById(args.id);
          if (!quiz)
            throw QuizNotFoundException(args.id);
          if (quiz.authorId !== context.user.id)
            throw UnauthorizedException;
          return [new Dto.Output.Quiz(quiz)];
        }

        let user: Entity.User = context.user;
        let quizzes = await this.quizRepository.getQuizzesOfUser(user.id);
        return quizzes.map(quiz => new Dto.Output.Quiz(quiz));
        
      }
    };
  };

  public get mutations(): IQuizMutations {
    return {
      createQuiz: async (parent, args: { quizData: Dto.Input.InsertQuizInput }, context) => {

        if (!context.user)
          throw UnauthenticatedException;
        
        let user: Entity.User = context.user;
        let quizData = args.quizData;
        let quiz = await this.quizManager.createQuiz(quizData, user);
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
      questions: async (quiz: Dto.Output.Quiz) => {
        let questions = await this.quizRepository.getQuestionsByQuizId(quiz.id);
        return questions.map(question => new Dto.Output.Question(question));
      },
      submissions: async (quiz: Dto.Output.Quiz) => {
        let submissions = await this.quizRepository.getSubmissionsByQuizId(quiz.id);
        return submissions.map(submission => new Dto.Output.Submission(submission));
      }
    };
  };

  public get Question(): IQuestionTypeResolver {
    return {
      quiz: async (question: Dto.Output.Question) => {
        let quiz = await this.quizRepository.getQuizById(question.quizId);
        return new Dto.Output.Quiz(quiz);
      },
      suggestions: async (question: Dto.Output.Question) => {
        let suggestions = await this.quizRepository.getSuggestionsByQuestionId(question.id);
        return suggestions.map(suggestion => new Dto.Output.Suggestion(suggestion));
      },
      answers: async (question: Dto.Output.Question) => {
        let answers = await this.quizRepository.getAnswersByQuestionId(question.id);
        return answers.map(answer => new Dto.Output.Answer(answer));
      }
    }
  }

}