import { IResolvers, makeExecutableSchema, ApolloServer } from "apollo-server-express";
import * as express from "express";
import { inject, injectable } from "inversify";
import { Types } from "../constants/types";
import { GraphQLDateTime } from "graphql-iso-date";
import { importSchema } from "graphql-import";
import { merge } from "lodash";
import { IUserResolver } from "./resolvers";
import { AuthMiddleware } from "./middleware/auth-middleware";

@injectable()
export class GraphQLServer {

  @inject(Types.IUserResolver) private readonly userResolver: IUserResolver
  @inject(Types.AuthMiddleware) private readonly authMiddleware: AuthMiddleware

  public get resolvers(): IResolvers {
    return {
      Query: merge(
        this.userResolver.queries
      ),
      Mutation: merge(
        this.userResolver.mutations
      )
    };
  }

  public run(app: express.Application, port: string = "3000") {
    let schema = makeExecutableSchema({
      typeDefs: importSchema(`${__dirname}/schema.graphql`),
      resolvers: this.resolvers
    });
    let server = new ApolloServer({
      schema: schema,
      introspection: true,
      context: ctx => this.authMiddleware.apply(ctx)
    });
    server.applyMiddleware({ app: app });
    app.listen(port, () => {
      console.log(`GraphQL Server is up and running at ${server.graphqlPath}`)
    });
  }

}