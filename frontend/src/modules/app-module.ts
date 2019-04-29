import { Container } from "inversify";
import { IUserSession } from "../session/user";
import { UserSessionImpl } from "../session/user/user-session-impl";
import { Types } from "../constants/types";
import ApolloClient from "apollo-client";
import { InMemoryCache, ApolloLink, NormalizedCacheObject } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { Config, EnvironmentConfig } from "../config/config";
import { initializeApp } from "firebase";


export default class AppModule {

  public static async load(config: Config): Promise<Container> {

    let container = new Container();
    let environmentConfig = process.env.NODE_ENV === "development" ? config.development : config.staging;

    container.bind<EnvironmentConfig>(Types.EnvironmentConfig).toConstantValue(environmentConfig);
    container.bind<IUserSession>(Types.IUserSession).to(UserSessionImpl);
    container.bind<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient).toDynamicValue(context => {
      let httpLink = createHttpLink({
        uri: environmentConfig.apiBaseUrl
      });
      return new ApolloClient<NormalizedCacheObject>({
        link: this.authLink(container).concat(httpLink),
        cache: new InMemoryCache()
      });
    });
    initializeApp(environmentConfig.firebaseConfig);
    
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