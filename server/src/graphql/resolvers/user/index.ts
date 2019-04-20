import { IQueryResolver, IMutatationResolver } from "..";
import { AuthCredentials } from "../../../model/dto/output/auth-credentials";
import { User } from "../../../model/entity/user";


export type IUserQueries = {
  login(parent, args, context, info): Promise<AuthCredentials>;
  me(parent, args, context, info): Promise<User>;
};

export type IUserMutations = {
  
}

export type IUserResolver = IQueryResolver<IUserQueries> & IMutatationResolver<IUserMutations>;