import { React } from "react";
import { Route, Switch } from "react-router-dom";
import { FlightForm } from "../components/flight-form/FlightForm";
import { Header } from "../components/header/Header";
import { HotelForm } from "../components/hotel-form/HotelForm";
import { MyBookings } from "../components/my-bookings/MyBookings";
import { Login } from "../pages/login/Login";
import { Registration } from "../pages/registration/Registration";
import { PrivateRoute } from "./PrivateRoutes";

function Routes() {
  return (
    <div>
      {/* <PrivateRoute exact path="/" Component={Header} /> */}
      

      <Switch>
        <PrivateRoute path="/" exact Component={FlightForm} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/registration" render={() => <Registration />} />
        <PrivateRoute path="/flights" exact Component={FlightForm} />
        <PrivateRoute path="/hotels" exact Component={HotelForm} />
        <PrivateRoute path="/my_bookings" exact Component={MyBookings} />
      </Switch>
    </div>
  );
}

export { Routes };
