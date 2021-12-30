import React from "react";
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from "./App";

const client = new ApolloClient({
  uri: 'https://graphql-api-for-twitter.herokuapp.com/',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
