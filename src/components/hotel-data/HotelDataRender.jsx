import React from "react";
import styles from "./HotelDataRender.module.css";
import HotelPreloader from "../../assets/hotel_preloader.gif";
import Rating from "@material-ui/lab/Rating";
import { MdFavorite } from "react-icons/md";
import { FaSwimmer, FaWifi, FaParking } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";

export const HotelDataRender = (props) => {
  const { data } = props;

  // console.log(data);
  return (
    <div className={styles.render_data_container}>
      {data.length ? (
        data.map((e) => {
          <h1>H1</h1>;
          return (
            <div className={styles.card_container}>
              <div className={styles.main_left}>
                <div className={styles.hotel_image_div}>
                  <img
                    src={e.max_photo_url}
                    className={styles.hotel_image}
                    alt="hotel picture"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div className={styles.text_description_div}>
                  <h3>
                    {e.hotel_name}{" "}
                    <Rating
                      name="read-only"
                      value={(e.review_score / 10) * 5}
                      readOnly
                      icon={<MdFavorite fontSize="15px" />}
                    />{" "}
                  </h3>
                  <h4>
                    {e.city_trans}&nbsp; |{" "}
                    <a
                      href={`https://maps.google.com?q=${e.latitude},${e.longitude}`}
                      target="_blank"
                    >
                      View On Map
                    </a>
                  </h4>
                  <p id="config">
                    <FaSwimmer className={styles.icons}/>
                    <IoRestaurant className={styles.icons}/>
                    <FaWifi className={styles.icons}/>
                    <FaParking className={styles.icons}/>
                    <CgGym className={styles.icons}/>
                  </p>
                </div>

                <div className={styles.check_in_check_out_div}>
                  <ul className={styles.ul_ci_co}>
                    <li>Check-In</li>
                    <li>Check-Out</li>
                  </ul>

                  <ul className={styles.ul_ci_co_times}>
                    <li>{e.checkin.from}</li>
                    <li>{e.checkout.until}</li>
                  </ul>
                  {e.ribbon_text ? (
                    <div className={styles.ribbon}>{e.ribbon_text}</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className={styles.main_right}>
                
                <div className={styles.price_div}>

                    <article>
                      <span className={styles.final_price}><span className={styles.currency}>{e.price_breakdown.currency}</span>{e.price_breakdown.all_inclusive_price}</span>
                        &nbsp;
                      <span className={styles.strikethrough_price}><span className={styles.currency}>{e.price_breakdown.currency}</span>{e.price_breakdown.all_inclusive_price + 750}</span>
                    </article>

                    <button className={styles.book_hotel_btn}><a href={e.url} target="_blank">Book Now</a></button>

                </div>

              </div>



            </div>
          );
        })
      ) : (
        <div className={styles.image_div}>
          <h1>Lets find you an awesome place to stay ! </h1>
          <img src={HotelPreloader} width="400px" height="200px" />
        </div>
      )}
    </div>
  );
};
