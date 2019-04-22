import { IQueryResolver, IMutatationResolver } from "..";
import { Dto } from "../../../model/dto";


export type ISubmissionQueries = {
  submission(parent, args, context, info): Promise<Dto.Output.Submission[]>;
};

export type ISubmissionMutations = {
  submit(parent, args, context, info): Promise<Dto.Output.Submission>;
}

export type ISubmissionTypeResolver = {
  user(submission: Dto.Output.Submission): Promise<Dto.Output.User>;
  quiz(submission: Dto.Output.Submission): Promise<Dto.Output.Quiz>;
  responses(submission: Dto.Output.Submission): Promise<Dto.Output.QuizResponse[]>;
  score(submission: Dto.Output.Submission): Promise<Dto.Output.Score>;
}

export type IAnswerTypeResolver = {
  submission(answer: Dto.Output.Answer): Promise<Dto.Output.Submission>;
  suggestion(answer: Dto.Output.Answer): Promise<Dto.Output.Suggestion>;
  question(answer: Dto.Output.Answer): Promise<Dto.Output.Question>;
}

export type IQuizResponseTypeResolver = {
  answers(quizResponse: Dto.Output.QuizResponse): Promise<Dto.Output.Answer[]>;
  question(quizResponse: Dto.Output.QuizResponse): Promise<Dto.Output.Question>;
}

export type ISubmissionResolver = IQueryResolver<ISubmissionQueries> & IMutatationResolver<ISubmissionMutations> & {
  Submission: ISubmissionTypeResolver;
  Answer: IAnswerTypeResolver;
  QuizResponse: IQuizResponseTypeResolver;
};