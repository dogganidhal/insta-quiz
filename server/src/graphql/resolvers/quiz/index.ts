import { Quiz } from "../../../model/entity/quiz";
import { IQueryResolver, IMutatationResolver } from "..";
import { IResolvers } from "graphql-tools";
import { User } from "../../../model/entity/user";
import { QuizSubmission } from "../../../model/entity/quiz_submission";
import { Question } from "../../../model/entity/question";


export type IQuizQueries = {
  myQuizzes(parent, args, context, info): Promise<Quiz[]>;
};

export type IQuizMutations = {
  createQuiz(parent, args, context, info): Promise<Quiz>;
}

export type IQuizTypeResolver = {
  author(quiz: Quiz): Promise<User>;
  questions(quiz: Quiz): Promise<Question[]>;
  submissions(quiz: Quiz): Promise<QuizSubmission[]>;
}

export type IQuizResolver = IQueryResolver<IQuizQueries> & IMutatationResolver<IQuizMutations> & {
  Quiz: IQuizTypeResolver
};