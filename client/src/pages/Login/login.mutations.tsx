import { useAuthToken } from "../../config/auth";
import { useAuthenticateMutation } from "../../generated/graphql";
export const useLoginMutation = () => {
  //eslint-disable-next-line
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  const [mutation] = useAuthenticateMutation({
    onCompleted: (data) => {
      setAuthToken(data.authenticate?.jwt);
    },
  });

  // full login function
  const loginMutation = (username: string, password: string) => {
    removeAuthtoken();
    return mutation({
      variables: {
        username,
        password,
      },
    });
  };
  return [loginMutation];
};
