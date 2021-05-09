import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
// import { ErrorResponse, onError } from "@apollo/client/link/error";
import { useAuthToken, useLogout } from "./auth";
const httpLink = createHttpLink({ uri: "http://172.16.3.124:3000/graphql" });

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers

    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

// const LogoutLink = () => {
//   const logout = useLogout();
//   return onError(({ networkError }: ErrorResponse) => {
//     if (
//       networkError &&
//       "statusCode" in networkError &&
//       networkError.statusCode === 401
//     )
//       console.log("KEK");
//     logout();
//   });
// };

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const [authToken] = useAuthToken();
  const client = new ApolloClient({
    link: from([authMiddleware(authToken), httpLink]),
    cache,
  });
  return client;
};
