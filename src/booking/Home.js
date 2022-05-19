import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


import { allHotels, deleteHotel, userHotelBookings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  

  useEffect(() => {
    loadAllhotels();
  }, []);


  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadAllhotels();
    });
  };

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };  

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center banner">
        <h1>All Hotels</h1>
      </div>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container-fluid">
        <br />
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h}  showViewMoreButton={!(h.postedBy._id === auth?.user._id)} owner={h.postedBy._id === auth?.user._id} handleHotelDelete={handleHotelDelete}/>
        ))}
      </div>
    </>
  );
};

export default Home;
