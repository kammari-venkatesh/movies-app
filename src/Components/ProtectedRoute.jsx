import { Navigate } from "react-router";
import Cookies from "js-cookie";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwt_token");

  return jwtToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
