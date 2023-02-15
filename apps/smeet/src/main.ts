import { createApp, provide, h } from 'vue';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import piniaPersist from 'pinia-plugin-persist';
import FontAwesomeIcon from './icons';

import './index.css';

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { createPinia } from 'pinia';
import axios from 'axios';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';

async function uiConfig(
  callback: (apolloClient: ApolloClient<NormalizedCacheObject>) => void
) {
  // Cache implementation
  const cache = new InMemoryCache({ addTypename: true });
  const result = await axios.get(`/api/getConfig`);

  const { appSyncUrl, appSyncApiKey } = result.data;

  const auth: AuthOptions = {
    type: AUTH_TYPE.API_KEY,
    apiKey: appSyncApiKey,
  };
  const region = 'eu-central-1';

  callback(
    new ApolloClient({
      link: ApolloLink.from([
        createAuthLink({ url: appSyncUrl, region, auth }),
        createSubscriptionHandshakeLink({ url: appSyncUrl, region, auth }),
      ]),
      cache,
    })
  );
}

uiConfig((apolloClient) => {
  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
  });

  const pinia = createPinia();
  pinia.use(piniaPersist);

  app.use(pinia);
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.mount('#app');
});
