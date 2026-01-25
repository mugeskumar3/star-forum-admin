import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("userToken");

  // If token exists, allow access to nested routes
  // If not, redirect to sign-in page
  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
