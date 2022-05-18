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
        <div className="col-md-4">
          {/* <div className="p-5 pointer"> */}
          {/* <div className="col-md-6 offset-md-3"> */}
           
            <CabForm/>
          {/* </div> */}
        </div>
        <div className="col-md-8">
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

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
         {notConnected()}

    </>
  );
};

export default CabContainer;
