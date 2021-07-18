import React, { useState, useEffect } from "react";
import { userManagement } from "../../data-context-provider/DataContextProvider";
import { Header } from "../header/Header";
import styles from "./MyBookings.module.css";
import axios from "axios";
import { MdAirplanemodeActive } from "react-icons/md";

export const MyBookings = () => {
  const [flightData, setflightData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/flights")
      .then((res) => {
        setflightData(res.data);
      })
      .catch((err) => {
        alert("NO DATA");
      });
  }, []);

  // console.log(flightData, "flidata");

  const user_data = React.useContext(userManagement);

  // console.log(user_data.loggedUserData);
  const active_user = React.useContext(userManagement);
  const { loggedUserData } = active_user;

  let finalResult = flightData.filter(
    (e) => e.user_id === loggedUserData.user_id
  );

  console.log(finalResult);

  return (
    <>
      <Header />
      <div className={styles.form_wrapper}>
        <div className={styles.my_bookings_div}>
          {finalResult?.map((e) => {
            return (
              <div className={styles.booking_description}>
                <h2>{e.carrierName}</h2>
                <div>
                  <h3>
                    {e.origin} <MdAirplanemodeActive /> {e.destination}{" "}
                  </h3>
                </div>
                <div>
                  <h4>₹ {e.price}/-</h4>
                  <h3>
                    {new Date(e.outboundDate).toLocaleString("en-us", {
                      weekday: "short",
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
