import React from "react";
import styles from "./FlightDataRender.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlightPreloader from "../../assets/fly_around.gif";

import AirIndiaLogo from "../../assets/airline-logos/AI.png";
import EmiratesLogo from "../../assets/airline-logos/EK.png";
import EtihadLogo from "../../assets/airline-logos/EY.png";
import GoFirstLogo from "../../assets/airline-logos/G8.png";
import AirAsiaLogo from "../../assets/airline-logos/I5.png";
import IndiGoLogo from "../../assets/airline-logos/6E.png";
import SpicejetLogo from "../../assets/airline-logos/SG.png";
import LufthansaLogo from "../../assets/airline-logos/LH.png";
import QatarLogo from "../../assets/airline-logos/QR.png";
import SingaporeLogo from "../../assets/airline-logos/SQ.png";
import TurkishLogo from "../../assets/airline-logos/TK.png";
import AllPurposeLogo from "../../assets/airline-logos/UK.png";

import Modal from '@material-ui/core/Modal';
import {MdAirplanemodeActive} from "react-icons/md";


const airlineLogos = {
  GoAir: GoFirstLogo,
  SpiceJet: SpicejetLogo,
  IndiGo: IndiGoLogo,
  "Air India": AirIndiaLogo,
  "AirAsia India": AirAsiaLogo,
  Emirates: EmiratesLogo,
  "Etihad Airways": EtihadLogo,
  "Singapore Airlines": SingaporeLogo,
  "Qatar Airways": QatarLogo,
  Lufthansa: LufthansaLogo,
  "Turkish Airlines": TurkishLogo,
  Vistara: AllPurposeLogo,
};

export const FlightDataRender = (props) => {
  const { data } = props;
  const [quotes, setQuotes] = React.useState([]);
  const [carriers, setCarriers] = React.useState([]);
  const [outDates, setOutDates] = React.useState([]);
  const [result, setResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    setIsLoading(true);
    setQuotes(data.Quotes);
    setCarriers(data.Carriers);
    setOutDates(data.Dates);
  }, [data]);

  // console.log(data);

  React.useEffect(() => {
    const results = carriers?.map((item, i) => {
      if (item.CarrierId === quotes[i].OutboundLeg.CarrierIds[0]) {
        const res = {
          Name: item.Name,
          Price: quotes[i].MinPrice,
          Logo: airlineLogos[item.Name]
            ? airlineLogos[item.Name]
            : airlineLogos["Vistara"],
          OutboundDate: outDates.OutboundDates[0].PartialDate,
          Origin: data.Places[0].Name,
          Destination: data.Places[1].Name,
        };
        return res;
      }
    });
    setResult(results);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [quotes, carriers]);

  // console.log(result, "result");

  return (
    <div className={styles.render_data_container}>
      <div className={styles.heading_div}>
        <ul className={styles.heading_ul} key="1">
          <li className={styles.heading_li} key="2">
            Airline
          </li>
          <li className={styles.heading_li} key="3">
            Departure
          </li>
          <li className={styles.heading_li} key="4">
            Duration
          </li>
          <li className={styles.heading_li} key="5">
            Arrival
          </li>
          <li className={styles.heading_li} key="6">
            Price
          </li>
          <li className={styles.heading_li} key="7"></li>
        </ul>
      </div>

      {isLoading ? (
        <span>
          <CircularProgress />
        </span>
      ) : (
        <div className={styles.list_card}>
          {result ? (
            result.map((e) => {
              return (
                <ul className={styles.list_ul} key={e.Price} key={e.hotel_id}>
                  <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                  <div className={styles.modal_styles}>
                     <h2 className={styles.modal_title}>Confirm Flight Booking</h2>
                       <p className={styles.simple_modal_description}>
                            <h3>{new Date(e.OutboundDate).toLocaleString("en-us", {weekday: "short",month: "short",year: "numeric",day: "numeric",})}</h3>
                            <h3>{e.Origin} <MdAirplanemodeActive/> {e.Destination} </h3>
                            <button className={styles.conirm_booking_btn}>Confirm</button>
                       </p>
                  </div>
                  </Modal>
                  <li className={styles.list_li}>
                    {" "}
                    <img src={e.Logo} alt="" width="30px" /> {e.Name}
                  </li>
                  <li className={styles.list_li}>
                    {new Date(e.OutboundDate).toLocaleString("en-us", {
                      weekday: "short",
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </li>
                  <li className={styles.list_li}>2h:30m</li>
                  <li className={styles.list_li}>
                    {new Date(e.OutboundDate).toLocaleString("en-us", {
                      weekday: "short",
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </li>
                  <li className={styles.list_li}>₹ {e.Price}</li>
                  <li className={styles.list_li}>
                    <button
                      className={styles.book_flight_btn}
                      onClick={handleOpen}
                    >
                      Book
                    </button>
                  </li>
                </ul>
              );
            }) 
          ) : (
            <img src={FlightPreloader} width="200px" />
          )}
        </div>
      )}
    </div>
  );
};

