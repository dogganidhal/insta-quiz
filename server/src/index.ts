import 'reflect-metadata';
import { GraphQLServer } from "./graphql/graphql-server";
import { Container } from "inversify";
import { Types } from "./constants/types";
import * as bodyParser from "body-parser";
import * as express from "express";
import { config } from "dotenv";
import { AuthMiddleware } from './graphql/middleware/auth-middleware';
import { createConnection, Connection } from 'typeorm';
import { IUserResolver } from './graphql/resolvers';
import { UserResolver } from './graphql/resolvers/user-resolver';
import { UserRepositoryImpl } from './repository/user/user-repo-impl';
import { IUserRepository } from './repository/user';

async function main() {

  config();
  let container = new Container();

  container.bind<IUserRepository>(Types.IUserRepository).to(UserRepositoryImpl);
  container.bind<IUserResolver>(Types.IUserResolver).to(UserResolver);
  container.bind<AuthMiddleware>(Types.AuthMiddleware).to(AuthMiddleware);
  container.bind<GraphQLServer>("GraphQLServer").to(GraphQLServer);

  let connection = await createConnection();
  container.bind<Connection>(Types.DatabaseConnection).toConstantValue(connection);

  let app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  let graphQLServer = container.get<GraphQLServer>("GraphQLServer");

  graphQLServer.run(app, process.env.PORT);

}

main();