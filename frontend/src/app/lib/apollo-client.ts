import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://127.0.0.1:8000/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;