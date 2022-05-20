import { useState } from "react";
import { toast } from "react-toastify";
import {  DatePicker, Select,TimePicker } from "antd";
import { useSelector } from "react-redux";
import moment from 'moment';
import { currencyFormatter } from "../../actions/stripe";
import { bookCab } from "../../actions/cab";

import  './cabForm.css'
import { useHistory } from "react-router-dom";

const format = 'h:mm a';
const { Option } = Select;

const DISTANCE_DISCOUNT = 25;

const fairArr = [
    {id: 1,source: "Mansarovar", destionation: "Mahesh Nagar", distance: 10, fairPerKm: 10 },
    {id: 2,source: "Mansarovar", destionation: "Vaishali", distance: 30, fairPerKm: 10},
    {id: 3,source: "Mansarovar", destionation: "Bagru", distance: 50, fairPerKm: 10},
    {id: 4,source: "Sodala", destionation: "Bagru", distance: 100, fairPerKm: 10},
    {id: 5,source: "Sodala", destionation: "Vaishali", distance: 100, fairPerKm: 10},
    {id: 6,source: "Sodala", destionation: "Mahesh Nagar", distance: 20, fairPerKm: 10},
]

const CabForm = () => {
  const history = useHistory()
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  // const { token } = auth;
  // state
  const [values, setValues] = useState({
    source: "",
    destination: "",
    distance: 0,
    fair: 0,
    time: moment().format(format),
    departureDate: "",
  });
  const [message, setMessage] = useState('')
  
  // destructuring variables from state
  const { source, destination, distance, fair,time,departureDate } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth || !auth?.token) {
      history.push("/login");
      return;
    }
    
    
   
    window.sessionStorage.setItem("cabDetails", JSON.stringify(values));    history.push(`/cabs/payment/1`);
    return;

    let formData = new FormData();
    formData.append("source", source);
    formData.append("destination", destination);
    formData.append("distance", distance);
    formData.append("fair", fair);
    formData.append("time", time);
    formData.append("departureDate", departureDate);

    // try {
    //   let res = await bookCab(token, formData);
    //   toast.success("Cab is booked");
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err.response.data);
    // }
  };


  function onChange(time, timeString) {
      if(!timeString) {
        return;
      }
    setValues({ ...values, time: timeString });
    setMessage("");
  }

  const handleLocationChange = (location, field) => {
        setValues((values)=>{
            return { ...values, [field]: location }
        });
        setMessage("")
        
};

const calculateFair = () => {
   if(values.destination && values.source) {
                const result = fairArr.find(row => row.destionation === values.destination && row.source === values.source)
                // console.log(result)
                if(result){
                    const fair  = DISTANCE_DISCOUNT > result.distance  ? 0 : (result.distance -DISTANCE_DISCOUNT) * result.fairPerKm;
                    const distance  = result.distance;
                    let message = `Your total fair is ${currencyFormatter({
                      amount: fair,
                      currency: "INR",
                    })}`

                    message += `&nbsp; Rate per KM - ${result.fairPerKm} Rupees`
                    message += `&nbsp; Distance is - ${distance} KM`

                    if(!fair) {
                      message += `&nbsp; You got discount for 25KM`
                    }
                      setMessage(message)
                      setValues({ ...values, fair, distance })
                }

            }
}

  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="form-row d-flex m-5 align-items-center">
      <div className="form-group col-md-2">

<Select
    className="w-100 m-2 p-1 cab-form"
    onChange = {(value) => {handleLocationChange(value, 'source')}}
    size="large"
    placeholder="Source"
  >
    <Option key={"Mansarovar"}>Mansarovar</Option>
    <Option key={"Sodala"}>Sodala</Option>
  </Select>
  </div>
  <div className="form-group col-md-2">
  <Select
    className="w-100 m-2 p-1 cab-form"
    onChange = {(value) => {handleLocationChange(value, 'destination')}}
    placeholder="Destination"
  >
    <Option key={"Mahesh Nagar"}>Mahesh Nagar</Option>
    <Option key={"Vaishali"}>Vaishali</Option>
    <Option key={"Bagru"}>Bagru</Option>
\        </Select>
</div>
<div className="form-group col-md-2">
<DatePicker
  placeholder="Departure Date"
  className="form-control w-100  m-2 p-1"
  onChange={(date, dateString) => {
    setValues({ ...values, departureDate: dateString })
    setMessage("");
  }
  }
  disabledDate={(current) =>
    current && current.valueOf() < moment().subtract(1, "days")
  }
/>
</div>
<div className="form-group col-md-2">
  <TimePicker className="w-100  m-2 p-1" use12Hours format="h:mm a" onChange={onChange}  value={moment(time, format)}/>               
</div>
<div className="form-group col-md-4">&nbsp; &nbsp;
<button className="btn btn-outline-primary m-2" type="button" onClick={calculateFair}>Calculate Fair</button>
<button className="btn btn-outline-primary m-2">Book</button>
 
</div>
  </div>
    </form>
    {message && <div className="alert alert-primary" role="alert" dangerouslySetInnerHTML={{__html: message}}>
    </div>}
    </>
  );
};

export default CabForm;
