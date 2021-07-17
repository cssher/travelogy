import React, { useContext, useState } from "react";
import { userManagement } from "../../data-context-provider/DataContextProvider";
import { Redirect, Link } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
  const user = useContext(userManagement);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(user);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let { authenticateUser } = user;
    authenticateUser({ email: email, password: password });
  };

  let { loading, isAuth } = user;

  console.log(loading, "loading");

  console.log(isAuth, 'isAuth');

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.login_form_div}>
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
        <button type="submit">Login In</button>
      </form>
      <br />
      <Link className={styles.register_link} to="/registration">
        Sign Up
      </Link>
    </div>
  );

  // return (
  //         <>
  //          {loading && <div>Loading...</div> }

  //          {!isAuth && (

  //          <div className={styles.login_form_div}>

  //              <form className={styles.form} onSubmit={handleLoginSubmit}>
  //                  <input type="email" placeholder="Enter Email ID" onChange={(e) => setEmail(e.target.value)} required/>
  //                  <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required/>
  //                  <button type="submit">Login In</button>
  //              </form>
  //                 <br />
  //              <Link className={styles.register_link} to="/registration">Sign Up</Link>
  //         </div>

  //          )}

  //          {isAuth && <Redirect to="/" />}
  //         </>

  //  )
};
