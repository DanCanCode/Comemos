import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isToken, setIsToken] = useState("");
  const token = useSelector((state) => state.currentUser.token);
  useEffect(() => {
    setIsToken(token);
  }, []);

  console.log(token);
  if (!isToken.length) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
