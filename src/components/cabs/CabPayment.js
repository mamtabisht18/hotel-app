import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";

import { useSelector } from "react-redux";
import Payment from "../../booking/Payment";
import { bookCab } from "../../actions/cab";


const fairArr = [
    {id: 1,source: "Mansarovar", destionation: "Mahesh Nagar", distance: 10, fairPerKm: 10 },
    {id: 2,source: "Mansarovar", destionation: "Vaishali", distance: 30, fairPerKm: 10},
    {id: 3,source: "Mansarovar", destionation: "Bagru", distance: 50, fairPerKm: 10},
    {id: 4,source: "Sodala", destionation: "Bagru", distance: 100, fairPerKm: 10},
    {id: 5,source: "Sodala", destionation: "Vaishali", distance: 100, fairPerKm: 10},
    {id: 6,source: "Sodala", destionation: "Mahesh Nagar", distance: 20, fairPerKm: 10},
]

const CabPayment = ({ match }) => {
    const hunel = new HunelCreditCard();
    const [route, setRoute] = useState({});

    const values =  window.sessionStorage.getItem("cabDetails");
     const { source, destination, distance, fair,time,departureDate } = JSON.parse(values);


    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;
  useEffect(() => {
    loadRouteDetails();
  }, []);

  const loadRouteDetails = async () => {
    let res = fairArr.find(fairList => fairList.id == match.params.id)
    if(res) {
      setRoute(res);
    }    
  };

  const onBookHotel = async (priceToPaid) =>{
     const values =  window.sessionStorage.getItem("cabDetails");
     const { source, destination, distance, fair,time,departureDate } = JSON.parse(values);

     // console.log(source, destination, distance, fair,time,departureDate)
       
      let formData = new FormData();
      formData.append("source", source);
      formData.append("destination", destination);
      formData.append("distance", distance);
      formData.append("fair", fair);
      formData.append("time", time);
      formData.append("departureDate", departureDate);
  
      try {
        let res = await bookCab(token, formData);
        toast.success("Cab is booked");
        setTimeout(() => {
          window.location.href = "/cabs"
        }, 1000);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      }
  }

  return (
    <>
       <HunelProvider config={hunel}>
    <Payment onBookHotel={onBookHotel} price={fair} showDiscount={false} />
  </HunelProvider>, 
    </>
  );
};

export default CabPayment;
