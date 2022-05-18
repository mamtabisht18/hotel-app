import { useState } from "react";
import { toast } from "react-toastify";
import {  Select,TimePicker } from "antd";
import { useSelector } from "react-redux";
import moment from 'moment';
import { currencyFormatter } from "../../actions/stripe";
import { bookCab } from "../../actions/cab";

const format = 'h:mm a';
const { Option } = Select;

const fairArr = [
    {source: "Mansarovar", destionation: "Sodala", distance: 10, fairPerKm: 5 },
    {source: "Mansarovar", destionation: "Vaishali", distance: 30, fairPerKm: 8},
    {source: "Sodala", destionation: "Bagru", distance: 100, fairPerKm: 5},
]

const CabForm = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    source: "",
    destination: "",
    distance: 0,
    fair: 0,
    time: moment().format(format)
  });
  const [message, setMessage] = useState('')
  
  // destructuring variables from state
  const { source, destination, distance, fair,time } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(source, destination, distance, fair)
    // console.log(values);
    // console.log(location);

    let formData = new FormData();
    formData.append("source", source);
    formData.append("destination", destination);
    formData.append("distance", distance);
    formData.append("fair", fair);
    

    try {
      let res = await bookCab(token, formData);
      console.log("CAB CREATE RES", res);
      toast.success("Cab is booked");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };


  function onChange(time, timeString) {
      if(!timeString) {
        return;
      }
    setValues({ ...values, time: timeString });
  }

  const handleLocationChange = (location, field) => {
        setValues((values)=>{
            const updatedValues = { ...values, [field]: location }

            if(updatedValues.destination && updatedValues.source) {

                const result = fairArr.find(row => row.destionation === updatedValues.destination && row.source === updatedValues.source)
                if(result){
                    updatedValues.fair  = result.distance * result.fairPerKm;
                    updatedValues.distance  = result.distance;
                    setMessage(`Your fair is ${currencyFormatter({
                        amount: updatedValues.fair,
                        currency: "INR",
                      })}`)
                }

            }
            return updatedValues
        });
        
};

  return (
    <>
    {JSON.stringify(values)}
    <div style={{color: 'green', fontWeight: 'bold'}} className="text-center">
    {message}
    </div>
      <div className="container-fluid bg-secondary p-5 nav-banner text-center">
        <h2>Book Cab</h2>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">

      <Select
          onChange = {(value) => {handleLocationChange(value, 'source')}}
          className="w-100 m-1"
          size="large"
          placeholder="Source"
        >
          <Option key={"Mansarovar"}>Mansarovar</Option>
          <Option key={"Sodala"}>Sodala</Option>
        </Select>

        <Select
          onChange = {(value) => {handleLocationChange(value, 'destination')}}
          className="w-100 m-1"
          size="large"
          placeholder="Destination"
        >
          <Option key={"Sodala"}>Sodala</Option>
          <Option key={"Vaishali"}>Vaishali</Option>
\        </Select>

        <TimePicker className="w-100 m-2" use12Hours format="h:mm a" onChange={onChange}  value={moment(time, format)}/>               

        </div>
      <button className="btn btn-outline-primary m-2">Book</button>
    </form>
    </>
  );
};

export default CabForm;
