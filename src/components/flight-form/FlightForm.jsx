import React, { useState, useCallback } from "react";
import styles from "./FlightForm.module.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { RiExchangeFill } from "react-icons/ri";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FlightDataRender } from "../flight-data/FlightDataRender";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <input
        type="radio"
        checked={checked == value}
        onChange={() => setter(value)}
      />
      <span>{label}</span>
    </label>
  );
};

export const FlightForm = () => {
  const [originDropdownData, setOriginDropdownData] = useState([]);
  const [destinationDropdownData, setDestinationDropdownData] = useState([]);
  const debouncedOrigin = useCallback(debounce(onOriginChange, 300), []);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [startDate_OW, setStartDate_OW] = useState(new Date());
  const [itenary, setItenary] = useState("one_way");
  const [flightData, setFlightData] = useState({});

  const debouncedDestination = useCallback(
    debounce(onDestinationChange, 300),
    []
  );

  function onOriginChange(value) {
    const options = {
      method: "GET",
      url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/IN/INR/en-GB/",
      params: { query: value },
      headers: {
        "x-rapidapi-key": "f121a9893dmshde3fc94e02a4a9dp11446djsn6564a3d4ff58",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setOriginDropdownData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function onDestinationChange(value) {
    const options = {
      method: "GET",
      url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/IN/INR/en-GB/",
      params: { query: value },
      headers: {
        "x-rapidapi-key": "f121a9893dmshde3fc94e02a4a9dp11446djsn6564a3d4ff58",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setDestinationDropdownData(response.data);
      })

      .catch(function (error) {
        console.error(error);
      });
  }

  let allDropdownData = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    function datestring(time) {
      return new Date(time.getTime() - time.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    }

    let outBoundDate = startDate
      ? datestring(startDate)
      : datestring(startDate_OW);
    let inBoundDate = endDate ? datestring(endDate) : "";

    // console.log(outBoundDate, inBoundDate);

    let originValue = document.querySelector("#origin_id").value;
    let destinationValue = document.querySelector("#destination_id").value;

    if (originValue && destinationValue) {
      //TO-DO-----------------------------------
      //   let selectedOriginVal = allDropdownData ? allDropdownData.filter(place => place.PlaceName === originValue) : originDropdownData?.Places.filter(
      //     (place) => place.PlaceName === originValue
      //   )
      //   let selectedDestinationVal = allDropdownData? allDropdownData.filter(place => place.PlaceName === destinationValue) : destinationDropdownData?.Places.filter(
      //     (place) => place.PlaceName === destinationValue
      //   )

      // console.log(allDropdownData);
      // console.log( selectedOriginVal, selectedDestinationVal);
      //----------------------------------------------

      let selectedOriginVal = originDropdownData?.Places.filter(
        (place) => place.PlaceName === originValue
      );
      let selectedDestinationVal = destinationDropdownData?.Places.filter(
        (place) => place.PlaceName === destinationValue
      );

      let originCode = selectedOriginVal[0].PlaceId;
      let destinationCode = selectedDestinationVal[0].PlaceId;


      console.log(originCode, destinationCode);

      const options = {
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/en-US/${originCode}/${destinationCode}/${outBoundDate}`,
        params: { inboundpartialdate: inBoundDate },
        headers: {
          "x-rapidapi-key":
            "f121a9893dmshde3fc94e02a4a9dp11446djsn6564a3d4ff58",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setFlightData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (originValue.length < 1 || destinationValue.length < 1) {
      setOpen(true);
    }
  };

  const swapPlaces = () => {
    let originValue = document.querySelector("#origin_id").value;
    let destinationValue = document.querySelector("#destination_id").value;
    let arr;
    if (originValue && destinationValue) {
      let destination = originValue;
      let origin = destinationValue;
      document.querySelector("#origin_id").value = origin;
      document.querySelector("#destination_id").value = destination;
      arr = [...originDropdownData.Places, ...destinationDropdownData.Places];
      allDropdownData.push(arr);
    }
    // console.log(allDropdownData);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // console.log(originDropdownData, destinationDropdownData);
  // console.log(flightData);

  return (
    <div className={styles.form_container}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Please select both origin & destination before proceeding.
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit} className={styles.flight_form}>
        <div className={styles.origin_autocomplete}>
          <Autocomplete
            id="origin_id"
            freeSolo
            options={
              originDropdownData?.Places
                ? originDropdownData.Places
                : defaultData1
            }
            getOptionLabel={(option) => option.PlaceName}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => debouncedOrigin(e.target.value)}
                label="Origin"
                variant="outlined"
              />
            )}
          />
        </div>

        <div className={styles.swap_places}>
          <RiExchangeFill
            // onClick={swapPlaces}
            style={{ fontSize: "50px", cursor: "pointer" }}
          />
        </div>

        <div className={styles.origin_autocomplete}>
          <Autocomplete
            id="destination_id"
            freeSolo
            options={
              destinationDropdownData?.Places
                ? destinationDropdownData.Places
                : defaultData2
            }
            getOptionLabel={(option) => option.PlaceName}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => debouncedDestination(e.target.value)}
                label="Destination"
                variant="outlined"
              />
            )}
          />
        </div>

        <div className={styles.date_range}>
          {itenary === "one_way" ? (
            <DatePicker
              className={styles.date_range_input}
              required={true}
              selected={startDate_OW}
              onChange={(date) => setStartDate_OW(date)}
              placeholderText="Select Date"
              isClearable={true}
              dateFormat="MMMM d, yyyy"
            />
          ) : (
            <DatePicker
              className={styles.date_range_input}
              required={true}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="Select Date Range"
              isClearable={true}
              dateFormat="MMMM d, yyyy"
            />
          )}
        </div>

        <div className={styles.search_flight_btn_div}>
          <button className={styles.search_flight_btn}>Search</button>
        </div>
      </form>

      <div className={styles.radio_div}>
        <div style={{ margin: "" }}>
          <RadioInput
            label=""
            value="one_way"
            checked={itenary}
            setter={setItenary}
          />
          <label>One Way</label>
        </div>

        <div style={{ margin: "" }}>
          <RadioInput
            label=""
            value="round_trip"
            checked={itenary}
            setter={setItenary}
          />
          <label>Round Trip</label>
        </div>
      </div>
      <FlightDataRender data={flightData} />
    </div>
  );
};

const defaultData1 = [{ PlaceName: "" }];
const defaultData2 = [{ PlaceName: "" }];
