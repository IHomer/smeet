/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import fetch from 'node-fetch';

export class ApolloService {
  static instance: ApolloClient<NormalizedCacheObject>;

  static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!this.instance) {
      this.instance = ApolloService.apolloClientInstance(
        process.env['APP_SYNC_URL']!,
        process.env['AWS_REGION']!
      );
    }

    return this.instance;
  }

  static apolloClientInstance(url: string, region: string) {
    const auth: AuthOptions = {
      type: AUTH_TYPE.API_KEY,
      apiKey: process.env['APP_SYNC_API_KEY']!,
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
