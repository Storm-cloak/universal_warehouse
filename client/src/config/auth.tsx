import { useApolloClient } from "@apollo/client";
import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const setAuthToken = (authToken: string) => setCookie(TOKEN_NAME, authToken);
  const removeAuthToken = () => removeCookie(TOKEN_NAME);
  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const apolloClient = useApolloClient();

  const Logout = async () => {
    await apolloClient.clearStore(); // we remove all information in the store
    removeAuthToken();
    localStorage.removeItem("info");
  };
  return Logout;
};
