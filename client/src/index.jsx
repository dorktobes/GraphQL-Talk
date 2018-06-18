import React from 'react';
import reactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

import App from './components/App';

const httpLink = createHttpLink({
  uri: '/graphql',
  fetchOptions: {
    credentials: 'same-origin',
  },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: ApolloLink.from([httpLink]),
  cache,
});

reactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.querySelector('#app'),
);
