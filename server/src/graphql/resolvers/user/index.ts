import { IQueryResolver, IMutatationResolver } from "..";
import { AuthCredentials } from "../../../model/dto/output/auth-credentials";
import { User } from "../../../model/entity/user";
import { QuizSubmission } from "../../../model/entity/quiz_submission";


export type IUserQueries = {
  login(parent, args, context, info): Promise<AuthCredentials>;
  me(parent, args, context, info): Promise<User>;
};

export type IUserMutations = {
  
}

export type IUserTypeResolver = {
  quizSubmissions(user: User): Promise<QuizSubmission[]>;
}

export type IUserResolver = IQueryResolver<IUserQueries> & IMutatationResolver<IUserMutations> & {
  User: IUserTypeResolver
};