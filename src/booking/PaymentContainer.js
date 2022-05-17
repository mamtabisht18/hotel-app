import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { allHotels, bookHotel, read } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";

import Payment from "./Payment";
import { useSelector } from "react-redux";

const PaymentContainer = ({ match }) => {
    const hunel = new HunelCreditCard();
    const [hotel, setHotel] = useState({});

    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    setHotel(res.data);
  };

  const onBookHotel = async () =>{

    try {
      let res = await bookHotel(auth.token, hotel._id, hotel.price);
      console.log("ORDER CREATE RES", res);
      toast.success("Hotel is booked", {...auth, ...{hotelCount: ((auth.hotelCount || 0) + 1)}});
      window.localStorage.setItem("auth", JSON.stringify({...auth, ...{hotelCount: ((auth.hotelCount || 0) + 1)}}));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }    
  }

  return (
    <>
       <HunelProvider config={hunel}>
    <Payment onBookHotel={onBookHotel} price={hotel.price} />
  </HunelProvider>, 
    </>
  );
};

export default PaymentContainer;
