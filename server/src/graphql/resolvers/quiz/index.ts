import { IQueryResolver, IMutatationResolver } from "..";
import { Dto } from "../../../model/dto";


export type IQuizQueries = {
  myQuizzes(parent, args, context, info): Promise<Dto.Output.Quiz[]>;
};

export type IQuizMutations = {
  createQuiz(parent, args, context, info): Promise<Dto.Output.Quiz>;
}

export type IQuizTypeResolver = {
  author(quiz: Dto.Output.Quiz): Promise<Dto.Output.User>;
  questions(quiz: Dto.Output.Quiz): Promise<Dto.Output.Question[]>;
  submissions(quiz: Dto.Output.Quiz): Promise<Dto.Output.QuizSubmission[]>;
}

export type IQuizSubmissionTypeResolver = {
  user(submission: Dto.Output.QuizSubmission): Promise<Dto.Output.User>;
  quiz(submission: Dto.Output.QuizSubmission): Promise<Dto.Output.Quiz>;
}

export type IQuizResolver = IQueryResolver<IQuizQueries> & IMutatationResolver<IQuizMutations> & {
  Quiz: IQuizTypeResolver;
  QuizSubmission: IQuizSubmissionTypeResolver;
};