import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { DefaultApolloClient } from "@vue/apollo-composable";

import "./index.css";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://countries.trevorblades.com/",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
}).mount("#app");
