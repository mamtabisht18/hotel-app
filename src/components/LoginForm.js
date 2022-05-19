import { useHistory } from "react-router-dom";

import { Link , NavLink} from "react-router-dom";


const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
const history = useHistory()

  const handleAction = () =>{
    history.push("/register");
      return;
  }

  return (

  <>
    {/* <div className="form-group mb-3">
      <label className="form-label"><strong>Email address</strong></label>
      <Input size="large" placeholder="Enter email" prefix={<MailOutlined />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
      </div>

    <div className="form-group mb-3">
      <label className="form-label"><strong>Password</strong></label>
      <Input size="large" placeholder="Enter password" prefix={<LockOutlined />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>

    </div>

    <button disabled={!email || !password} className="btn btn-primary">
      Submit
      
    </button> */}

    <div className="frame">
      <div className="nav">
        <ul className="links">
          <li><NavLink activeClassName='signin-active' className="btn" to="/login">Sign in</NavLink></li>
          <li><NavLink className="btn signin-inactive" to="/register">Sign up </NavLink></li>
        </ul>
      </div>
      <div>
        <form className="form-signin" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input className="form-styling" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input className="form-styling" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="btn-animate">
            <button className="btn-signin" disabled={!email || !password}>Sign in</button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  </>
)
  };

export default LoginForm;
