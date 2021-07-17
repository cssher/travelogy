import React, { useState, useCallback } from "react";
import styles from "./HotelForm.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {hotelDatabase} from "../../hotel-db/HotelDB";
import { HotelDataRender } from "../hotel-data/HotelDataRender";
import { Header } from "../header/Header";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const HotelForm = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedCity, setSelectedCity] = useState("");
  const [open, setOpen] = React.useState(false);
  const [hotelData, setHotelData] = useState([])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

//   console.log(hotelDatabase);

  const dropdownData = () => {
      let arr = [];
      let result;

      hotelDatabase.forEach(data => arr.push(data.city_trans))

      result = arr.filter((v, i, a) => a.indexOf(v) === i);
      return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let cityValue = document.querySelector("#city_id").value;
    
    if(cityValue) {
       let hotelDataArr = hotelDatabase.filter(item => item.city_trans === cityValue);
       setHotelData(hotelDataArr);
    }
    else {
        setOpen(true);
    }
  };

  // console.log(hotelData);




  return (
    <>
    <Header />
    <div className={styles.form_wrapper}>
    <div className={styles.form_container}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Please select city/place before proceeding.
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit} className={styles.hotel_form}>
        <div className={styles.hotel_autocomplete}>
          <Autocomplete
            id="city_id"
            options={dropdownData().map(item => item)}
            // getOptionLabel=""
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City/Place"
                variant="outlined"
              />
            )}
          />
        </div>

        <div className={styles.date_range}>
          
            <DatePicker
              className={styles.date_range_input}
              required={true}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="Check-In & Check-Out Date"
              isClearable={true}
              dateFormat="MMMM d, yyyy"
            />
          
        </div>

        <div className={styles.search_hotel_btn_div}>
          <button className={styles.search_hotel_btn}>Search</button>
        </div>
      </form>
      <HotelDataRender data={hotelData} />
    </div>
    </div>
    </>
  );
};
