import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>Login oder Signin</h1>
      <NavLink to={"./signin"}>Login</NavLink>
      <NavLink to={"./signup"}>Signup</NavLink>
    </>
  );
};

export default Login;
