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
  answers(submission: Dto.Output.Submission): Promise<Dto.Output.Answer[]>;
}

export type IAnswerTypeResolver = {
  submission(answer: Dto.Output.Answer): Promise<Dto.Output.Submission>;
  suggestion(answer: Dto.Output.Answer): Promise<Dto.Output.Suggestion>;
}

export type ISubmissionResolver = IQueryResolver<ISubmissionQueries> & IMutatationResolver<ISubmissionMutations> & {
  Submission: ISubmissionTypeResolver;
  Answer: IAnswerTypeResolver;
};