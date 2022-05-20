import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { LOGIN_MOCK } from "../mocks/user";
import { userHotelBookings } from "../actions/hotel";

import loginWallper from '../assets/login-backg.jpg'

import "./Login.css"

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        let bookings = await userHotelBookings(res.data.token);
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ", bookings.data?.length
        );
        // console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify({ ...res.data, ...{ hotelCount: bookings.data?.length || 0 } }));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { ...res.data, ...{ hotelCount: bookings.data?.length || 0 } },
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="login-form">
        <img src={loginWallper} />
        <div className="">
          <div className="p-5">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="frame">
          <div className="nav">
            <ul className="links">
              <li className="signin-active"><a className="btn">Sign in</a></li>
              <li className="signup-inactive"><a className="btn">Sign up </a></li>
            </ul>
          </div>
          <div>
            <form className="form-signin" action="" method="post" name="form"> <label for="username">Username</label> <input className="form-styling" type="text" name="username" placeholder="" /> <label for="password">Password</label> <input className="form-styling" type="text" name="password" placeholder="" /> <input type="checkbox" id="checkbox" /> <label for="checkbox"><span className="ui"></span>Keep me signed in</label>
              <div className="btn-animate"> <a className="btn-signin">Sign in</a> </div>
            </form>
            <form className="form-signup" action="" method="post" name="form"> <label for="fullname">Full name</label> <input className="form-styling" type="text" name="fullname" placeholder="" /> <label for="email">Email</label> <input className="form-styling" type="text" name="email" placeholder="" /> <label for="password">Password</label> <input className="form-styling" type="text" name="password" placeholder="" /> <label for="confirmpassword">Confirm password</label> <input className="form-styling" type="text" name="confirmpassword" placeholder="" /> <a ng-click="checked = !checked" className="btn-signup">Sign Up</a> </form>

          </div>
          <div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;
