import React, { useState, useContext } from "react";
import { userManagement } from "../../data-context-provider/DataContextProvider";
import styles from "./Registration.module.css";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Registration = () => {
  const user = useContext(userManagement);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const { addUserData, checkEmail } = user;
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userExists = checkEmail(email);
    if (userExists.length === 0) {
      //if email doesn't exists go inside if and push data
      let user_id = uuid();
      let payload = {
        user_id,
        username,
        email,
        password,
        fullName,
        flights_booked: [],
        hotels_booked: [],
      };

      addUserData(payload); // adding registred user data to our database
      history.push("/");
    } else {
      setOpen(true);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Email already exists !
        </Alert>
      </Snackbar>
      <div>
        <input
          className={styles.input1}
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />{" "}
      </div>

      <div>
        <input
          className={styles.input2}
          type="fullName"
          value={fullName}
          placeholder="fullName"
          onChange={(e) => setFullName(e.target.value)}
          name="fullName"
          required
        />
      </div>

      <div>
        <input
          className={styles.input3}
          type="username"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />
      </div>

      <div>
        <input
          className={styles.input4}
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
      </div>

      <div>
        <input className={styles.btn} type="submit" value="sign up" />
      </div>
    </form>
  );
};
