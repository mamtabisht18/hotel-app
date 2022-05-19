import { useHistory } from "react-router-dom";
import { NavLink} from "react-router-dom";


const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {

  const history = useHistory()

  const handleAction = () => {
    history.push("/login");
    return;
  }
  return (
      <div className="frame">
        <div className="nav">
          <ul className="links">
          <li><NavLink className="btn signin-inactive" to="/login">Sign in</NavLink></li>
          <li><NavLink  activeClassName='btn signin-active' to="/register">Sign up </NavLink></li>
          </ul>
        </div>
        <div>
          <form className="form-signin" onSubmit={handleSubmit}>
            <label htmlFor="username">Full Name</label>
            <input className="form-styling" type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input className="form-styling" type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>

            <input className="form-styling" type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <div className="btn-animate">
              <button disabled={!name || !email || !password} className="btn-signin">
        Sign Up
      </button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>
  )
};

export default RegisterForm;
