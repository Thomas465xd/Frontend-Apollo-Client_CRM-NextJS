"use client"

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "https://backend-graphql-crm.onrender.com/graphql",
    fetch
})

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem("AUTH_TOKEN");

    return {
        headers: {
            ...headers, // preserve existing headers
            authorization: token ? `Bearer ${token}` : "", // add auth token if it exists
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
})

export default client;