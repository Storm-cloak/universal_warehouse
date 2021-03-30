import { useForm } from "react-hook-form";
import React from "react";
import { useLoginMutation } from "./login.mutations";
import { History } from "history";
interface IFormInput {
  username: string;
  password: string;
}

interface IProps {
  history: History;
}

const AuthenticationForm = ({ history }: IProps) => {
  // react-hook-form boilerplate
  const { register, handleSubmit } = useForm<IFormInput>();

  // we import our loginMutation here
  const [loginMutation] = useLoginMutation();

  const onSubmit = handleSubmit(async ({ username, password }) => {
    await loginMutation(username, password);
    history.push("/");
  });

  return (
    <>
      <div style={{ margin: "auto", padding: "100px" }}>
        <form onSubmit={onSubmit}>
          <div>
            <input name="username" type="text" ref={register()} />
          </div>
          <div>
            <input name="password" type="password" ref={register()} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AuthenticationForm;
