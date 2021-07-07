import React from 'react';
import {render} from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import App from "./App";

const cache= new InMemoryCache();
const client = new ApolloClient({
    uri: 'http://localhost:4000/qraphql',
    cache: cache
});






render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'),
);
