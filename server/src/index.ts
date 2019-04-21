import 'reflect-metadata';
import { GraphQLServer } from "./graphql/graphql-server";
import { Container } from "inversify";
import { Types } from "./constants/types";
import * as bodyParser from "body-parser";
import * as express from "express";
import { config } from "dotenv";
import { AuthMiddleware } from './graphql/middleware/auth-middleware';
import { createConnection, Connection } from 'typeorm';
import { IUserResolver } from './graphql/resolvers/user';
import { UserResolverImpl } from './graphql/resolvers/user/user-resolver-impl';
import { UserRepositoryImpl } from './repository/user/user-repo-impl';
import { IUserRepository } from './repository/user';
import { QuizResolverImpl } from './graphql/resolvers/quiz/quiz-resolver-impl';
import { IQuizRepository } from './repository/quiz';
import { QuizRepositoryImpl } from './repository/quiz/quiz-repo-impl';
import { IQuizResolver } from './graphql/resolvers/quiz';
import { IQuizManager } from './manager/quiz';
import { QuizManagerImpl } from './manager/quiz/quiz-manager-impl';
import { IAuthManager } from './manager/auth';
import { AuthManagerImpl } from './manager/auth/auth-manager-impl';
import { ISubmissionResolver } from './graphql/resolvers/submission';
import { SubmissionResolverImpl } from './graphql/resolvers/submission/submission-resolver-impl';
import { ISubmissionRepository } from './repository/submission';
import { SubmissionRepositoryImpl } from './repository/submission/submission-repo-impl';
import { ISubmissionManager } from './manager/submission';
import { SubmissionManagerImpl } from './manager/submission/submission-manager-impl';

async function main() {

  config();
  let container = new Container();

  container.bind<IUserRepository>(Types.IUserRepository).to(UserRepositoryImpl);
  container.bind<IQuizRepository>(Types.IQuizRepository).to(QuizRepositoryImpl);
  container.bind<ISubmissionRepository>(Types.ISubmissionRepository).to(SubmissionRepositoryImpl);
  container.bind<IQuizManager>(Types.IQuizManager).to(QuizManagerImpl);
  container.bind<IAuthManager>(Types.IAuthManager).to(AuthManagerImpl);
  container.bind<ISubmissionManager>(Types.ISubmissionManager).to(SubmissionManagerImpl);
  container.bind<IUserResolver>(Types.IUserResolver).to(UserResolverImpl);
  container.bind<IQuizResolver>(Types.IQuizResolver).to(QuizResolverImpl);
  container.bind<ISubmissionResolver>(Types.ISubmissionResolver).to(SubmissionResolverImpl);
  container.bind<AuthMiddleware>(Types.AuthMiddleware).to(AuthMiddleware);
  container.bind<GraphQLServer>(Types.GraphQLServer).to(GraphQLServer);

  let connection = await createConnection(process.env.DB_CONFIG);
  container.bind<Connection>(Types.DatabaseConnection).toConstantValue(connection);

  let app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  let graphQLServer = container.get<GraphQLServer>(Types.GraphQLServer);

  graphQLServer.run(app, process.env.PORT);

}

main();