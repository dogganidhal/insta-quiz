

export let Types = {
  DatabaseConnection: Symbol.for("Connection"),
  IUserRepository: Symbol.for("IUserRepository"),
  IQuizRepository: Symbol.for("IQuizRepository"),
  IUserResolver: Symbol.for("IUserResolver"),
  IQuizResolver: Symbol.for("IQuizResolver"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  GraphQLServer: Symbol.for("GraphQLServer"),
  IQuizManager: Symbol.for("IQuizManager"),
  IAuthManager: Symbol.for("IAuthManager"),
  ISubmissionResolver: Symbol.for("ISubmissionResolver"),
  ISubmissionRepository: Symbol.for("ISubmissionRepository"),
  ISubmissionManager: Symbol.for("ISubmissionManager")
}