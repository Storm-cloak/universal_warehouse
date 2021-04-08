//======================================================================================\\
//                               IMPORTS                                                \\
//======================================================================================\\
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
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
//If you have two CSS classes applied to the same element with the same degree of specificity, 
//then the winner will be the CSS class that is defined last within the document
import {useStyles} from './login.styles'
import { useAuthToken } from "../../config/auth";
import { useAuthenticateMutation } from "../../graphql/generated/graphql";
import { yupResolver } from '@hookform/resolvers';
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import * as yup from 'yup'


//======================================================================================\\
//                                INTERFACES AND SCHEMAS                                \\
//======================================================================================\\
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
const SignupSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})


//======================================================================================\\
//                                 LOGIN PAGE                                           \\
//======================================================================================\\

const AuthenticationForm = ({ history }: IProps) => {
  const classes = useStyles();
  //errors hooks
  const [graphQLErrors, setErrors] = useState<IErrors>({
    message: "",
    hint: "",
  });
  // react-hook-form boilerplate
  const { control, handleSubmit, reset, formState:{errors} } = useForm<IFormInput>({
    mode:"onBlur",
    resolver: yupResolver(SignupSchema)
  });

  //token hooks`
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  //login - generated graphql mutation
  const [loginMutation] = useAuthenticateMutation({
    onCompleted: (data) => {
      setAuthToken(data.authenticate?.jwt);
      reset();
      history.push("/");
    },
    onError(err) {
      setErrors({
        message: err.graphQLErrors[0].message,
        hint: err.graphQLErrors[0].extensions?.exception.hint,
      });
      alert("WHOPS")
    },
  });

  //remove token (make sure no user authorized) -> call login mutation -> onCompleted || onError
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
    <>
    <Grid  container className={classes.root}>
      <Paper elevation={20} className={classes.paper}>
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
                  error={!!errors.username}
                  helperText={errors?.username?.message}
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
                  error={!!errors.password}
                  helperText={errors?.password?.message}
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
          Forgot password? Please,contact with administrator.
        </Typography>
      </Paper>
      <Box className={classes.captionFooter}>
        <Typography>Made with love in IT Bridge</Typography>
      </Box>
    </Grid>
    </>
  );
};

export default AuthenticationForm;

