import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { Credentials } from 'aws-sdk';

export class ApolloClientFactory {
  static instance: ApolloClient<NormalizedCacheObject>;

  static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!this.instance) {
      this.instance = ApolloClientFactory.apolloClientInstance(
        process.env.APP_SYNC_URL,
        process.env.AWS_REGION
      );
    }

    return this.instance;
  }

  static apolloClientInstance(url: string, region: string) {
    const auth: AuthOptions = {
      type: AUTH_TYPE.AWS_IAM,
      credentials: () =>
        new Credentials(
          process.env.AWS_ACCESS_KEY_ID,
          process.env.AWS_SECRET_ACCESS_KEY,
          process.env.AWS_SESSION_TOKEN
        ),
    };

    const authConfig = {
      url: url,
      region: region,
      auth: auth,
    };
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        createAuthLink(authConfig),
        createHttpLink({ uri: url, fetch }),
      ]),

      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
  }
}
