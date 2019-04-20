import { Quiz } from "../../../model/entity/quiz";
import { IQueryResolver, IMutatationResolver } from "..";


export type IQuizQueries = {
  myQuizzes(parent, args, context, info): Promise<Quiz[]>;
};

export type IQuizMutations = {
  createQuiz(parent, args, context, info): Promise<Quiz>;
}

export type IQuizResolver = IQueryResolver<IQuizQueries> & IMutatationResolver<IQuizMutations>;