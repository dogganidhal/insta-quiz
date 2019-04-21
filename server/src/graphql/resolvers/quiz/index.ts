import { IQueryResolver, IMutatationResolver } from "..";
import { Dto } from "../../../model/dto";


export type IQuizQueries = {
  Quiz(parent, args, context, info): Promise<Dto.Output.Quiz[]>;
};

export type IQuizMutations = {
  createQuiz(parent, args, context, info): Promise<Dto.Output.Quiz>;
}

export type IQuizTypeResolver = {
  author(quiz: Dto.Output.Quiz): Promise<Dto.Output.User>;
  questions(quiz: Dto.Output.Quiz): Promise<Dto.Output.Question[]>;
  submissions(quiz: Dto.Output.Quiz): Promise<Dto.Output.Submission[]>;
}

export type IQuestionTypeResolver = {
  quiz(question: Dto.Output.Question): Promise<Dto.Output.Quiz>;
  suggestions(question: Dto.Output.Question): Promise<Dto.Output.Suggestion[]>;
  answers(question: Dto.Output.Question): Promise<Dto.Output.Answer[]>;
}

export type IQuizResolver = IQueryResolver<IQuizQueries> & IMutatationResolver<IQuizMutations> & {
  Quiz: IQuizTypeResolver;
  Question: IQuestionTypeResolver;
};