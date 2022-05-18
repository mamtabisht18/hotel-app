import { MailOutlined, LockOutlined  } from '@ant-design/icons';
import { Input } from 'antd';

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => (
   
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label"><strong>Email address</strong></label>
      <Input size="large" placeholder="Enter email" prefix={<MailOutlined />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
      </div>

    <div className="form-group mb-3">
      <label className="form-label"><strong>Password</strong></label>
      <Input size="large" placeholder="Enter password" prefix={<LockOutlined />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>

    </div>

    <button disabled={!email || !password} className="btn btn-primary">
      Submit
    </button>
  </form>
);

export default LoginForm;
