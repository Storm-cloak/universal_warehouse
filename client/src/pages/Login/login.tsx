import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { History } from "history";
import {
  TextField,
  FormControl,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from "@material-ui/core";
import { useAuthToken } from "../../config/auth";
import { useAuthenticateMutation } from "../../graphql/generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 444,
      margin: "20px auto",
      borderRadius: 8,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
      width: "100%",
    },
    submit: {
      width: 212,
      height: 40,
      margin: 40,
    },
    captionTop: {
      padding: 25.5,
      borderBottom: `1px solid rgba(0, 16, 61, 0.12)`,
    },
    captionBottom: {
      borderTop: `1px solid rgba(0, 16, 61, 0.12)`,
      color: "#919399",
      marginTop: 80,
      padding: 20,
    },
  })
);
interface IFormInput {
  username: string;
  password: string;
}
interface IErrors {
  message: string;
  hint: string;
}
interface IProps {
  history: History;
}

const AuthenticationForm = ({ history }: IProps) => {
  const classes = useStyles();
  //errors hooks
  const [errors, setErrors] = useState<IErrors>({
    message: "",
    hint: "",
  });
  // react-hook-form boilerplate
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  //token hooks
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  //login generated graphql mutation
  const [loginMutation] = useAuthenticateMutation({
    onCompleted: (data) => {
      setAuthToken(data.authenticate?.jwt);
      history.push("/");
      reset();
    },
    onError(err) {
      setErrors({
        message: err.graphQLErrors[0].message,
        hint: err.graphQLErrors[0].extensions?.exception.hint,
      });
    },
  });

  const onSubmit = ({ username, password }: IFormInput) => {
    removeAuthtoken();
    loginMutation({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paper}>
        <Typography className={classes.captionTop} variant="h5" align="center">
          Log in to Anbar
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset">
            <Controller
              render={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  required
                  id="username"
                  label="Username"
                  autoComplete="username"
                  error={!!errors.message}
                />
              )}
              name="username"
              control={control}
              defaultValue=""
            />
          </FormControl>
          <FormControl component="fieldset">
            <Controller
              render={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  required
                  id="password"
                  label="Password"
                  autoComplete="password"
                  type="password"
                  error={!!errors.message}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
          </FormControl>
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
        <Typography align="center" className={classes.captionBottom}>
          Forgot password? Please,contact with administrator
        </Typography>
      </Paper>
    </Grid>
  );
};

export default AuthenticationForm;

// <h5>{errors.message}</h5>
// <h5>{errors.hint}</h5>
