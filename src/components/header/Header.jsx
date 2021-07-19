import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaPlaneDeparture, FaHotel, FaSuitcaseRolling } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { userManagement } from "../../data-context-provider/DataContextProvider";
import Trip from "../../assets/trip.png";

export const Header = () => {
  let history = useHistory();
  let dataContext = React.useContext(userManagement);
  let { handelLogOut } = dataContext;

  console.log(dataContext.loading);

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

          <NavLink className={styles.nav_links} to="/my_bookings">
            My Bookings.
          </NavLink>

          <button className={styles.logout_btn} onClick={handelLogOut}>
            Log Out
          </button>
        </div>
      </div>

      <div className={styles.toggle_forms_card}>
        <div className={styles.form_card_links}>
          <NavLink
            id="flight_nav"
            className={styles.nav_icons_link}
            to="/flights"
            activeStyle={{
              color: "royalblue",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaPlaneDeparture style={{ fontSize: "40px", margin: "auto" }} />
              <span>Flights</span>
            </div>
          </NavLink>

          <NavLink
            id="hotel_nav"
            className={styles.nav_icons_link}
            to="/hotels"
            activeStyle={{
              color: "royalblue",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaHotel style={{ fontSize: "40px", margin: "auto" }} />
              <span>Hotels</span>
            </div>
          </NavLink>

          <NavLink
            id="train_nav"
            className={styles.nav_icons_link}
            to="/my_bookings"
            activeStyle={{
              color: "royalblue",
            }}
          >
            <div className={styles.form_card_icon_and_text}>
              <FaSuitcaseRolling style={{ fontSize: "40px", margin: "auto" }} />
              <span>My Bookings</span>
            </div>
          </NavLink>
        </div>
      </div>

      {(!history.pathname === "/flights" ||
        !history.pathname === "/hotels" ||
        !history.pathname === "/my_bookings") && (
        <div className={styles.form_wrapper}>
          <div className={styles.homepage_content}>
            <h1 style={{ marginTop: "50px" }}>Hello, Lets Explore !</h1>
            <h4>Book the cheapeast flights & hotels</h4>
            <img src={Trip} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};
