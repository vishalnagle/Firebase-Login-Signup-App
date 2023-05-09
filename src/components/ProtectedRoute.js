import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // Protected route component
  let userToken = localStorage.getItem("token");

  if (!userToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
