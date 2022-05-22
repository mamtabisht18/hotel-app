import React, { useState, useEffect } from "react";
import { read, diffDays, isAlreadyBooked, getDiscountedPrice } from "../actions/hotel";
import { currencyFormatter } from "../actions/stripe";
import moment from "moment";
import { useSelector } from "react-redux";

import './ViewHotel.css'
import { AMENITIES } from "../constants";

const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        // console.log(res);
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    setHotel(res.data);
    if (res.data?.amenities) {
      setAmenities(res.data.amenities.split(""))
    }
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    history.push(`/payment/${hotel._id}`);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center banner">
        <h1>{hotel.title}</h1>
      </div>
      <div className="hotel-detail-wrapper">
        <div className="hotel-title">
          <b>{hotel.content}</b>
          <p className="alert alert-info mt-3">

            {auth && auth.hotelCount ? (
              <>
                <s>{currencyFormatter({
                  amount: hotel.price || 0,
                  currency: "INR",
                })}</s>
                &nbsp;
                <b>
                  {currencyFormatter({
                    amount: getDiscountedPrice(hotel.price) || 0,
                    currency: "INR",
                  })}


                </b>
                &nbsp;
                <span className="discount-per">10 % off</span>

              </>
            ) : (
              <>
                {currencyFormatter({
                  amount: hotel.price || 0,
                  currency: "INR",
                })}
              </>
            )

            }
          </p>
        </div>
        <div className="hotel-detail">
          <div className="hotel-detail-column">
            <div className="hotel-detail-card">
              <img src={image} alt={hotel.title} className="img img-fluid m-2 hotel-image" />    </div>
          </div>

          <div className="hotel-detail-column">
            <div className="hotel-detail-card amenities-card">
              <div className="amenities-card-header">
                Amenities & Services
              </div>
              <div className="amenities-card-content">
                {!!amenities.length && AMENITIES.map((row) => {
                  if (amenities.includes(row.value)) {
                    return (
                      <p key={row.value}><i className={row.icon}></i>&nbsp;&nbsp;{row.label}</p>
                    )
                  }
                })}
              </div>
              <div className="amenities-card-footer">
                <div>
                  <p>Check-in</p><p className="time">12:00 PM</p>
                </div>
                <div>
                  <p>Check-Out</p><p className="time">12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hotel-detail-column">
            <div className="hotel-detail-card other-card">
              <div className="other-details-header">
                Booking & Other Details
              </div>
              <div className="other-details-content">
                <p>
                  <span>
                    for {diffDays(hotel.from, hotel.to)}{" "}
                    {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                  </span>
                </p>
                <p>
                  From <br />{" "}
                  {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p>
                  To <br />{" "}
                  {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
              </div>
              <div className="other-details-footer">
                {auth?.user?._id !== hotel?.postedBy?._id && <button
                  onClick={handleClick}
                  className="btn btn-block btn-lg btn-primary mt-3"
                  disabled={loading || alreadyBooked}
                >
                  {loading
                    ? "Loading..."
                    : alreadyBooked
                      ? "Already Booked"
                      : auth && auth.token
                        ? "Book Now"
                        : "Login to Book"}
                </button>}
              </div>


            </div>
          </div>

          {/* <div className="hotel-detail-column">
    <div className="hotel-detail-card">
      <h3>Card 4</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div> */}
        </div>
      </div>


    </>
  );
};

export default ViewHotel;
