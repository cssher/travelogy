import React, { useState, useCallback } from "react";
import styles from "./FlightForm.module.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { RiExchangeFill } from "react-icons/ri";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


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

export const FlightForm = () => {
  const [originDropdownData, setOriginDropdownData] = useState([]);
  const [destinationDropdownData, setDestinationDropdownData] = useState([]);
  const debouncedOrigin = useCallback(debounce(onOriginChange, 300), []);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const originValue = document.querySelector("#origin_id").value;
    const destinationValue = document.querySelector("#destination_id").value;
    if (originValue && destinationValue) {
      const selectedOriginVal = originDropdownData?.Places.filter(
        (place) => place.PlaceName === originValue
      );
      const selectedDestinationVal = destinationDropdownData?.Places.filter(
        (place) => place.PlaceName === destinationValue
      );

      let originCode = selectedOriginVal[0].PlaceId;
      let destinationCode = selectedDestinationVal[0].PlaceId;

      console.log(originCode, destinationCode);

      const options = {
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/en-US/${originCode}/${destinationCode}/2021-07-15`,
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
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    else if(originValue.length < 1 || destinationValue.length < 1) {
      setOpen(true);
    }
  };

  const swapPlaces = () => {
    const originValue = document.querySelector("#origin_id").value;
    const destinationValue = document.querySelector("#destination_id").value;
    if (originValue && destinationValue) {
      let destination = originValue;
      let origin = destinationValue;
      document.querySelector("#origin_id").value = origin;
      document.querySelector("#destination_id").value = destination;
    }
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_div}>
        
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
              onClick={swapPlaces}
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

          <div className={styles.search_flight_btn_div}>
            <button className={styles.search_flight_btn}>Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const defaultData1 = [{ PlaceName: "" }];
const defaultData2 = [{ PlaceName: "" }];
