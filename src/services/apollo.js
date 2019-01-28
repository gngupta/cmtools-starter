import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  InMemoryCache, IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import {
  createApolloClient
} from 'vue-cli-plugin-apollo/graphql-client';
import introspectionQueryResultData from '@/graphql/graphql-fragments.json';

// Install the vue plugin
Vue.use(VueApollo);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

//init cache
const myCache = new InMemoryCache({
  fragmentMatcher
});

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint: null,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default http link
  // link: link,
  // Override default cache
  cache: myCache

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }

};

export default function createProvider(httpEndpoint, link) {
  defaultOptions.httpEndpoint = httpEndpoint
  defaultOptions.link = link
  // Create apollo client
  const {
    apolloClient,
    wsClient
  } = createApolloClient({
    ...defaultOptions

  });
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'no-cache',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  });
}