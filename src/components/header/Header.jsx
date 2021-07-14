import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaPlaneDeparture, FaHotel, FaTrain } from "react-icons/fa";
import { FlightForm } from "../flight-form/FlightForm";
import { HotelForm } from "../hotel-form/HotelForm";
import { TrainForm } from "../train-form/TrainForm";
import { useHistory } from "react-router-dom";

export const Header = () => {
  let history = useHistory();

  return (
    <div className="header">
        
      <div className={styles.sticky_nav}>
        <div className={styles.nav_routes}>
          <NavLink className={styles.nav_links} to="/flights">
            Flights.
          </NavLink>

          <NavLink className={styles.nav_links} to="/hotels">
            Hotels.
          </NavLink>

          <NavLink className={styles.nav_links} to="/trains">
            Trains.
          </NavLink>

          <NavLink className={styles.nav_links} to="/explore">
            And More.
          </NavLink>
        </div>
      </div>

      <div className={styles.toggle_forms_card}>
        <div className={styles.form_card_links}>
          <NavLink
            id="flight_nav"
            className={styles.nav_icons_link}
            to="/flights"
            activeStyle={{
              color: "#8338ec",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaPlaneDeparture style={{ fontSize: "40px" }} />
              <span>Flights</span>
            </div>
          </NavLink>

          <NavLink
            id="hotel_nav"
            className={styles.nav_icons_link}
            to="/hotels"
            activeStyle={{
              color: "#8338ec",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaHotel style={{ fontSize: "40px" }} />
              <span>Hotels</span>
            </div>
          </NavLink>

          <NavLink
            id="train_nav"
            className={styles.nav_icons_link}
            to="/trains"
            activeStyle={{
              color: "#8338ec",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaTrain style={{ fontSize: "40px" }} />
              <span>Trains</span>
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.form_wrapper}>
        {history.location.pathname === "/flights" && <FlightForm />}
        {history.location.pathname === "/hotels" && <HotelForm />}
        {history.location.pathname === "/trains" && <TrainForm />}
      </div>
    </div>
  );
};
