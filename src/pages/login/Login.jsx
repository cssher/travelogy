import React, { useContext, useState } from "react";
import { userManagement } from "../../data-context-provider/DataContextProvider";
import { Redirect, Link } from "react-router-dom";
import styles from "./Login.module.css";
import LoginPng from "../../assets/trip.png";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Login = () => {
  const user = useContext(userManagement);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let { authenticateUser } = user;
    let auth = authenticateUser({ email: email, password: password });
    if (!auth) {
      setOpen(true);
    }
  };

  let { isAuth } = user;

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.login_form_div}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Wrong email or password !
        </Alert>
      </Snackbar>
      <div className={styles.login_png}>
        <img src={LoginPng} alt="Login Png" width="80%" />
      </div>
      <div className={styles.login_form_wrapper}>
        <form className={styles.form} onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Enter Email ID"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.btn_wrapper}>
            <button type="submit">Login In</button>
          </div>
          <div className={styles.register_link_wrapper}>
            <Link className={styles.register_link} to="/registration">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
