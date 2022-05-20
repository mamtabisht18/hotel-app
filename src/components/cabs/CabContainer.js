import { CarOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ConnectNav from "../ConnectNav";
import DashboardNav from "../DashboardNav";
import CabForm from "./CabForm";
import CabsList from "./CabsList";

const CabContainer = () => { 

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
           
            <CabForm/>
        </div>
        <div className="col-md-12">
        <CabsList/>
        </div>
      </div>
    </div>
  );

  return (
      
    <>
    <div className="container-fluid bg-secondary p-5 nav-banner">
        <ConnectNav />
      </div>
      
         {notConnected()}

    </>
  );
};

export default CabContainer;
