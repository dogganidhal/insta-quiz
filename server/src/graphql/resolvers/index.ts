
export interface IQueryResolver {
  readonly queries: any;
}

export interface IMutatationResolver {
  readonly mutations: any;
}

export type IUserResolver = IQueryResolver & IMutatationResolver;