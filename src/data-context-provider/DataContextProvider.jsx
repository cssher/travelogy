import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const userManagement = createContext();

export const DataContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/users")

      .then((res) => {
        setUsersData(res.data);
        setLoading(false);
      })

      .catch((err) => setError(true), setLoading(false));
  }, []);

  const reloadUsers = (user) => {
    setUsersData(user);
  };

  const addUserData = (payload) => {
    let {
      user_id,
      email,
      username,
      fullName,
      password,
      avatar_img,
      flights_booked,
      hotels_booked,
    } = payload;

    setLoading(true);

    axios
      .post("http://localhost:3000/users", {
        user_id,
        email,
        username,
        fullName,
        password,
        avatar_img,
        flights_booked,
        hotels_booked,
      })
      .then((res) => {
        setLoading(false);
        setError(false);
        reloadUsers(res.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const authenticateUser = (data) => {
    let { email, password } = data;
    let auth = false;

    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].email === email && usersData[i].password === password) {
        setIsAuth(true);
        setLoggedUserData(usersData[i]);
        auth = true;
        break;
      } else {
        if (
          usersData[i].email === email &&
          usersData[i].password !== password
        ) {
          setError(true);
          auth = true;
          break;
        }
      }
    }
    return auth;
  };

  const handelLogOut = () => {
    setIsAuth(false);
  };

  const updateLoggedUserData = (data) => {
    this.setState({
      loggedUserData: data,
    });
  };

  const checkEmail = (email) => {
    let userEmailExists = usersData.filter((e) => e.email === email);

    return userEmailExists;
  };

  const value = {
    authenticateUser,
    addUserData,
    checkEmail,
    isAuth,
    usersData,
    updateLoggedUserData,
    handelLogOut,
    reloadUsers,
    loggedUserData,
    loading,
    error,
  };

  return (
    <userManagement.Provider value={value}>
      {props.children}
    </userManagement.Provider>
  );
};
