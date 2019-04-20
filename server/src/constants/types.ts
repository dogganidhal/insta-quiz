

export let Types = {
  DatabaseConnection: Symbol.for("Connection"),
  IUserRepository: Symbol.for("IUserRepository"),
  IQuizRepository: Symbol.for("IQuizRepository"),
  IUserResolver: Symbol.for("IUserResolver"),
  IQuizResolver: Symbol.for("IQuizResolver"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  GraphQLServer: Symbol.for("GraphQLServer")
}