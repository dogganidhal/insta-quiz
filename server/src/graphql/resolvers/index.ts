
export interface IQueryResolver<T = any> {
  readonly queries: T;
}

export interface IMutatationResolver<T = any> {
  readonly mutations: T;
}