import { useStore } from "@nanostores/react";
import { $authStore } from "astro-clerk-auth/stores";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client/core";

const base_url = import.meta.env.PUBLIC_HASURA_BASE_URL;
const httpLink = new HttpLink({ uri: base_url });

export const createApolloClient = () => {
  const { session } = useStore($authStore);

  async function createAuthMiddleware() {
    const token = await session.getToken({ template: "hasura" });
    return new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      return forward(operation);
    });
  }

  async function createClient() {
    return new ApolloClient({
      link: concat(await createAuthMiddleware(), httpLink),
      cache: new InMemoryCache(),
    });
  }

  return {
    createClient,
  };
};
