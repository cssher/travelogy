import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {FaPlaneDeparture, FaHotel, FaTrain} from "react-icons/fa"


export const Header = () => {
    return (
        <div className="header">

            <div className={styles.sticky_nav}>

                <NavLink to="/">
                    <h1><span style={{backgroundColor: "crimson", color: "white"}}>Tr</span>avelogy</h1>
                </NavLink>

                <div className={styles.nav_routes}>

                    <NavLink className={styles.nav} to="/flights" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                        Flights.
                    </NavLink>

                    <NavLink className={styles.nav} to="/hotels" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                        Hotels.
                    </NavLink>

                    <NavLink className={styles.nav} to="/trains" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                        Trains.
                    </NavLink>

                    <NavLink className={styles.nav} to="/explore" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                        And More.
                    </NavLink>

                </div>
                

            </div>

            <div className={styles.nav_card}>
               
                <NavLink className={styles.nav} to="/flights" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                    <FaPlaneDeparture style={{fontSize: "50px"}} /> 
                    <p>Flights</p>
                </NavLink>

                <NavLink className={styles.nav} to="/hotels" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                    <FaHotel style={{fontSize: "50px"}}/>
                    <p>Hotels</p>
                </NavLink>

                <NavLink className={styles.nav} to="/trains" activeStyle={{padding: "0 12px 0 12px", backgroundColor: "blue", color: "black"}}>
                    <FaTrain style={{fontSize: "50px"}}/>
                    <p>Trains</p>
                </NavLink>
            </div>

            
        </div>
    )
}
