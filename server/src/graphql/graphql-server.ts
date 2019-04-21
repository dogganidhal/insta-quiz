import { IResolvers, makeExecutableSchema, ApolloServer } from "apollo-server-express";
import * as express from "express";
import { inject, injectable } from "inversify";
import { Types } from "../constants/types";
import { GraphQLDateTime } from "graphql-iso-date";
import { importSchema } from "graphql-import";
import { merge } from "lodash";
import { IUserResolver } from "./resolvers/user";
import { AuthMiddleware } from "./middleware/auth-middleware";
import { IQuizResolver } from "./resolvers/quiz";
import { ISubmissionResolver } from "./resolvers/submission";

@injectable()
export class GraphQLServer {

  @inject(Types.IUserResolver) private readonly userResolver: IUserResolver;
  @inject(Types.IQuizResolver) private readonly quizResolver: IQuizResolver;
  @inject(Types.ISubmissionResolver) private readonly submissionResolver: ISubmissionResolver;
  @inject(Types.AuthMiddleware) private readonly authMiddleware: AuthMiddleware;

  public get resolvers(): IResolvers {
    return merge(
      {
        Query: merge(
          this.userResolver.queries,
          this.quizResolver.queries,
          this.submissionResolver.queries
        ),
        Mutation: merge(
          this.userResolver.mutations,
          this.quizResolver.mutations,
          this.submissionResolver.mutations
        )
      },
      {
        User: this.userResolver.User,
        Quiz: this.quizResolver.Quiz,
        Submission: this.submissionResolver.Submission,
        Question: this.quizResolver.Question,
        Answer: this.submissionResolver.Answer,
        Suggestion: this.quizResolver.Suggestion,
      }
    );
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