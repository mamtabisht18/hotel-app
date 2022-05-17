import { CarOutlined  } from "@ant-design/icons";
import ConnectNav from "../ConnectNav";
import DashboardNav from "../DashboardNav";

const CabContainer = () => { 

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <CarOutlined className="h1" />
            <h4>Coming Soon...</h4>
            {/* <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              className="btn btn-primary mb-3"
            >
              Book Now
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p> */}
          </div>
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
