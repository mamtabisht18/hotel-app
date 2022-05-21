import { CarOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ConnectNav from "../ConnectNav";
import DashboardNav from "../DashboardNav";
import CabForm from "./CabForm";
import CabsList from "./CabsList";

const CabContainer = () => { 

  const notConnected = () => (
    <div className="payment-container">
      <CabForm/>
      <CabsList/>
    </div>
  );

  return (
      
    <>
    <div className="container-fluid bg-secondary p-5 cab-banner">
        {/* <ConnectNav /> */}
      </div>
      
         {notConnected()}

    </>
  );
};

export default CabContainer;
