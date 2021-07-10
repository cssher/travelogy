import React, { useState, useCallback } from "react";
import styles from "./FlightForm.module.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
        "x-rapidapi-key": "f121a9893dmshde3fc94e02a4a9dp11446djsn6564a3d4ff58",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
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
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="origin_id"
          freeSolo
          size="small"
          options={
            originDropdownData?.Places
              ? originDropdownData.Places
              : defaultData1
          }
          getOptionLabel={(option) => option.PlaceName}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => debouncedOrigin(e.target.value)}
              label="Origin"
              variant="outlined"
            />
          )}
        />

        <Autocomplete
          id="destination_id"
          freeSolo
          size="small"
          options={
            destinationDropdownData?.Places
              ? destinationDropdownData.Places
              : defaultData2
          }
          getOptionLabel={(option) => option.PlaceName}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => debouncedDestination(e.target.value)}
              label="Destination"
              variant="outlined"
            />
          )}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

const defaultData1 = [{ PlaceName: "" }];
const defaultData2 = [{ PlaceName: "" }];
