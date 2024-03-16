import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getToken } from "../utils/token";

/**
 * logoutLink defines a middleware link using Apollo's onError function from the apollo-link-error package.
 * This middleware intercepts GraphQL errors before they're forwarded to application's operation flow.
 *
 * Cast originalError to any type to avoid TypeScript errors.
 * 401 typically signifies an unauthorized request or an expired authentication token.
 *
 * It helps in automatically logging out users when their authentication state is no longer valid,
 * without having to manually check for 401 errors in each network request across your app.
 */
const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

/**
 * authLink using Apollo's setContext function allows you to dynamically set the context for each GraphQL operation
 * authLink can be composed with other Apollo Client links (e.g., HTTP link, WebSocket link) to construct the full link chain,
 * ensures that every request sent by the Apollo Client includes the necessary authentication token
 */
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken(),
    },
  };
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${WS_URL}/graphql`,
    connectionParams: {
      token: getToken(),
    },
  })
);

/**
 * The split function is used to "split" outgoing operations between the wsLink / httpLink based on the type of operation being executed.
 * If the operation is a subscription, it will use the WebSocket link; otherwise, for query/mutation it will fall back to using the HTTP link.
 *
 * The split function checks if the main operation of the query is a subscription, takes three arguments:
 *  a test function that returns a boolean,
 *  the link to use if the test function returns true,
 *  and the link to use if the test function returns false. The test function
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    merged[args.skip + i] = incoming[i];
  }
  return merged;
}

/**
 * InMemoryCache: Apollo Client uses to cache query results, reducing the number of network requests.
 * typePolicies: This is where you define policies for individual types in your GraphQL schema. Here, policies are defined for the root query type (Query).
 *
 * fields: Specifies custom policies for fields on the Query type. Custom policies are defined for chats and messages fields.
 * chats: keyArgs: false means that all fetches for chats will share the same cache entry regardless of any arguments provided in the query.
 * messages: keyArgs: ["chatId"], indicating that cache entries for messages should be differentiated based on the chatId argument. This allows Apollo to cache messages separately for each chat.
 *
 * Link Composition: combination of three links (logoutLink, authLink, and splitLink), concatenated in a specific order.
 * This composite link controls the flow of GraphQL operations.
 * logoutLink → authLink → splitLink matters:
 * 1 logoutLink: First, it checks for errors. If an authentication error (like 401 Unauthorized) is detected, it can trigger a logout. This happens before the request is sent, so if there's an error, the subsequent links might not even execute for that request.
 * 2 authLink: Next, it adds the authorization token to the headers, ensuring the request is authenticated.
 * 3 splitLink: Finally, it decides whether to send the operation over HTTP or WebSocket, based on the operation type (query/mutation vs. subscription).
 */
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },
          messages: {
            keyArgs: ["chatId"],
            merge,
          },
        },
      },
    },
  }),
  link: logoutLink.concat(authLink).concat(splitLink),
});

export default client;
