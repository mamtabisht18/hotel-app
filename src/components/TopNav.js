import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";

const { Meta } = Card;

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const active = window.location.pathname;

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="top-nav nav">
      <div className="d-flex justify-content-between align-items-center">
        <NavLink exact={true} activeClassName='active' className="nav-link logo-link" to="/">
          <span className="first">
            Fi
          </span>
          <span className="second">
            no
          </span>
          <span className="third">
            tel
          </span>
        </NavLink>

        {auth !== null && (
          <>
            <NavLink exact={true} activeClassName='active' className="nav-link" to="/">
              <i className="fa fa-fw fa-home" /> Home
            </NavLink>
            <NavLink className="nav-link" to="/dashboard">
              <i className="fa fa-dashboard"></i> Dashboard
            </NavLink>
            {auth.hotelCount ? (<NavLink className="nav-link" to="/cabs">
              <i className="fa fa-cab"></i> Cabs
            </NavLink>) : ''}
          </>
        )}

      </div>

      <div className="d-flex justify-content-between align-items-center right-nav">

        {auth === null && (
          <>
            <NavLink className="nav-link" to="/login">
              <i className="fa fa-fw fa-user"></i>Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              <i className="fa fa-user-plus"></i> Register
            </NavLink>
          </>
        )}
        {auth !== null && (
          <>
          {/* <div>
          <Meta
          avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{auth.user.name[0]}</Avatar>}
          title={auth.user.name}
          description={`Joined ${moment(auth.user.createdAt).fromNow()}`}
        />


          </div> */}
            <span className="rounded-avatar"
            height="22">{auth.user.name[0]}B</span>
            &nbsp;
            <div className="user-info">
            <span>{auth.user.name}</span>
            <small>Joined {moment(auth.user.createdAt).fromNow()}</small>
            </div>

         
      
          
            <a className="nav-link pointer" href="#" onClick={logout}>
              <i className="fa fa-sign-out"></i> Logout
            </a>
          </>

        )}
      </div>



    </div>
  );
};

export default TopNav;
