import { Link , NavLink} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
    <div className="nav bg-light d-flex justify-content-between">
      <div className="d-flex justify-content-between">
      <NavLink exact={true} activeClassName='active' className="nav-link" to="/">
      <i className="fa fa-fw fa-home"/> Home
      </NavLink> 

      {auth !== null && (
        <NavLink className="nav-link" to="/dashboard">          
          <i className="fa fa-dashboard"></i> Dashboard
        </NavLink>
      )}

    {auth !== null && (
        <NavLink className="nav-link" to="/cabs">
          <i className="fa fa-cab"></i> Cabs
        </NavLink>
      )}
      </div>
     
    <div className="d-flex justify-content-between">

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
        <a className="nav-link pointer" href="#" onClick={logout}>
          <i className="fa fa-sign-out"></i> Logout
        </a>
      )}
    </div>
     

      
    </div>
  );
};

export default TopNav;
