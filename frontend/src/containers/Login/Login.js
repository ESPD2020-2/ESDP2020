import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles((theme) => ({
  wrap: {
    [theme.breakpoints.up("xs")]: {
      position: "absolute",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    [theme.breakpoints.up("sm")]: {
      top: "45%",
      maxHeight: "calc(100% - 300px)",
    },
  },
  titleWrap: {
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
      padding: "0 16px",
      backgroundColor: "#fafafa",
    },
    [theme.breakpoints.up("sm")]: {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      padding: "0 16px",
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        "linear-gradient(360deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(250,250,250,1) 34%, rgba(250,250,250,1) 100%)",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
      textAlign: "center",
    },
  },
  formWrap: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.loginError);
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ ...state }));
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.wrap}
      style={{ maxWidth: "500px", maxHeight: "calc(100% - 230px)" }}
    >
      <Grid item xs style={{ width: "100%" }}>
        <Paper elevation={3} className={classes.titleWrap}>
          <Box className={classes.title} px={1}>
            <Typography variant="h4">Bойти</Typography>
          </Box>
          <Box className={classes.formWrap} pt={5} pb={2}>
            <form onSubmit={submitFormHandler}>
              <Grid container direction="column" spacing={2}>
                {error && (
                  <Grid item xs>
                    <Alert severity="error">{error.error}</Alert>
                  </Grid>
                )}
                <Grid item xs>
                  <FormElement
                    propertyName="username"
                    title="Логин"
                    value={state.username}
                    onChange={inputChangeHandler}
                    type="text"
                    autoComplete="current-username"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Пароль"
                    value={state.password}
                    onChange={inputChangeHandler}
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Bойти
                  </Button>
                </Grid>
                <Grid item xs>
                  <FacebookLogin />
                </Grid>
                <Grid item xs style={{ textAlign: "center" }}>
                  <Link component={NavLink} to="/register" variant="body2">
                    {"У вас нет аккаунта? Зарегистрируйтесь"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
