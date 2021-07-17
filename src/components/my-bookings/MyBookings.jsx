import React from "react";
import { Header } from "../header/Header";
import styles from "./MyBookings.module.css";

export const MyBookings = () => {
  return (
    <>
      <Header />
      <div className={styles.form_wrapper}>

          <div className={styles.my_bookings_div}>

                <h1>SHOW ALL BOOKINGS HERE</h1>

          </div>
        
      </div>
    </>
  );
};
