import { ISubmissionResolver, ISubmissionQueries, ISubmissionMutations, ISubmissionTypeResolver, IAnswerTypeResolver, IQuizResponseTypeResolver } from ".";
import { injectable, inject } from "inversify";
import { Dto } from "../../../model/dto";
import { UnauthenticatedException, SubmissionNotFoundException, UnauthorizedException } from "../../../exceptions";
import { Types } from "../../../constants/types";
import { ISubmissionRepository } from "../../../repository/submission";
import { IUserRepository } from "../../../repository/user";
import { IQuizRepository } from "../../../repository/quiz";
import { ISubmissionManager } from "../../../manager/submission";


@injectable()
export class SubmissionResolverImpl implements ISubmissionResolver {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;
  @inject(Types.ISubmissionRepository) private readonly submissionRepository: ISubmissionRepository;
  @inject(Types.ISubmissionManager) private readonly submissionManager: ISubmissionManager;
  
  public get queries(): ISubmissionQueries {
    return {
      submission: async (parent, args: { id?: string }, context) => {

        if (!context.user)
          throw UnauthenticatedException;

        if (args.id) {
          let submission = await this.submissionRepository.getSubmissionById(args.id, ["quiz"]);
          if (!submission)
            throw SubmissionNotFoundException(args.id);
          if (submission.userId !== context.user.id || submission.quiz.authorId !== context.user.id)
            throw UnauthorizedException;
          return [new Dto.Output.Submission(submission)];
        }

        let submissions = await this.submissionRepository.getSubmissionsByUserId(context.user.id);
        return submissions.map(submission => new Dto.Output.Submission(submission));

      }
    };
  };

  public get mutations(): ISubmissionMutations {
    return {
      submit: async (parent, args: { submissionData: Dto.Input.InsertSubmissionInput }, context) => {
        
        if (!context.user)
          throw UnauthenticatedException;

        return await this.submissionManager.submit(args.submissionData, context.user);

      }
    };
  };

  public get Submission(): ISubmissionTypeResolver {
    return {
      user: async (submission: Dto.Output.Submission) => {
        let user = await this.userRepository.getUserById(submission.userId);
        return new Dto.Output.User(user);
      },
      quiz: async (submission: Dto.Output.Submission) => {
        let quiz = await this.quizRepository.getQuizById(submission.quizId);
        return new Dto.Output.Quiz(quiz);
      },
      score: async submission => await this.submissionManager.calculateScore(submission.id),
      responses: async submission => await this.submissionManager.getQuizResponsesOfSubmission(submission.id),
    };
  };

  public get Answer(): IAnswerTypeResolver {
    return {
      suggestion: async (answer: Dto.Output.Answer) => {
        let suggestion = await this.quizRepository.getSuggestionsById(answer.suggestionId);
        return new Dto.Output.Suggestion(suggestion);
      },
      submission: async (answer: Dto.Output.Answer) => {
        let submission = await this.submissionRepository.getSubmissionById(answer.submissionId);
        return new Dto.Output.Submission(submission);
      },
      question: async (answer: Dto.Output.Answer) => {
        let question = await this.quizRepository.getQuestionById(answer.questionId);
        return new Dto.Output.Question(question);
      }
    };
  }

  public get QuizResponse(): IQuizResponseTypeResolver {
    return {
      answers: async (quizResponse: Dto.Output.QuizResponse) => {
        let answers = await this.quizRepository.getAnswersByQuestionId(quizResponse.questionId);
        return answers.map(answer => new Dto.Output.Answer(answer));
      },
      question: async (quizResponse: Dto.Output.QuizResponse) => {
        let question = await this.quizRepository.getQuestionById(quizResponse.questionId);
        return new Dto.Output.Question(question);
      },
    }
  }

}