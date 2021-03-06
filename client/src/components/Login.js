import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <h2>Welcome Back!</h2>

        <form>
          <label>Email:</label>
          <input type="text" id="email" name="email" />

          <label>Password:</label>
          <input type="text" id="password" name="password" />

          <input type="submit" value="Submit"></input>
        </form>

        <p>
          New to Comemos? <Link to={"/signup"}>Sign up Here!</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
