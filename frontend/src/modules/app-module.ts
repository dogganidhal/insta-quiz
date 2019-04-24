import { Container } from "inversify";
import { IUserSession } from "../session/user";
import { UserSessionImpl } from "../session/user/user-session-impl";
import { Types } from "../constants/types";
import ApolloClient from "apollo-client";
import { InMemoryCache, ApolloLink, NormalizedCacheObject } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloCache } from "apollo-cache";


export default class AppModule {

  public static async load(): Promise<Container> {

    let container = new Container();
    
    container.bind<IUserSession>(Types.IUserSession).to(UserSessionImpl);
    container.bind<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient).toDynamicValue(context => {
      let httpLink = createHttpLink({
        uri: "http://localhost:3000/graphql"
      });
      return new ApolloClient<NormalizedCacheObject>({
        link: this.authLink(container).concat(httpLink),
        cache: new InMemoryCache()
      });
    });
    return container;
    
  }

  private static authLink(container: Container): ApolloLink {
    return setContext((_, { headers }) => {
      let authCredentials = container.get<IUserSession>(Types.IUserSession).authCredentials;
      return {
        headers: {
          ...headers,
          authorization: authCredentials ? `Bearer ${authCredentials.accessToken}` : "",
        }
      }
    })
  }

}