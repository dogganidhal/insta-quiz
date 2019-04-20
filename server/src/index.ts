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
import { UserResolver } from './graphql/resolvers/user/user-resolver';
import { UserRepositoryImpl } from './repository/user/user-repo-impl';
import { IUserRepository } from './repository/user';
import { QuizResolver } from './graphql/resolvers/quiz/quiz-resolver';
import { IQuizRepository } from './repository/quiz';
import { QuizRepositoryImpl } from './repository/quiz/quiz-repo-impl';
import { IQuizResolver } from './graphql/resolvers/quiz';
import { IQuizManager } from './manager/quiz';
import { QuizManagerImpl } from './manager/quiz/quiz-manager-impl';

async function main() {

  config();
  let container = new Container();

  container.bind<IUserRepository>(Types.IUserRepository).to(UserRepositoryImpl);
  container.bind<IQuizRepository>(Types.IQuizRepository).to(QuizRepositoryImpl);
  container.bind<IQuizManager>(Types.IQuizManager).to(QuizManagerImpl);
  container.bind<IUserResolver>(Types.IUserResolver).to(UserResolver);
  container.bind<IQuizResolver>(Types.IQuizResolver).to(QuizResolver);
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