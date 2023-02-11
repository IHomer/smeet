import { createApp, provide, h } from 'vue';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import piniaPersist from 'pinia-plugin-persist';
import FontAwesomeIcon from './icons';

import './index.css';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { createPinia } from 'pinia';
import axios from 'axios';

async function uiConfig(
  callback: (apolloClient: ApolloClient<NormalizedCacheObject>) => void
) {
  // Cache implementation
  const cache = new InMemoryCache({ addTypename: true });
  const result = await axios.get(`/api/getConfig`);

  const { appSyncUrl, appSyncApiKey } = result.data;

  callback(
    new ApolloClient({
      link: createHttpLink({
        uri: appSyncUrl,
        headers: {
          'X-API-KEY': appSyncApiKey,
        },
      }),
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
