import { IQueryResolver, IMutatationResolver } from "..";
import { Dto } from "../../../model/dto";


export type IUserQueries = {
  login(parent, args, context, info): Promise<Dto.Output.AuthCredentials>;
  me(parent, args, context, info): Promise<Dto.Output.User>;
};

export type IUserMutations = {
  
}

export type IUserTypeResolver = {
  submissions(user: Dto.Output.User): Promise<Dto.Output.Submission[]>;
}

export type IUserResolver = IQueryResolver<IUserQueries> & IMutatationResolver<IUserMutations> & {
  User: IUserTypeResolver
};