import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkIfAuthenticated } from "./AuthCheck";
const PrivateRoute = () => {
  const location = useLocation();
  const auth = checkIfAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/vendor/login" />;
};
// state={{ from: location }} replace
export default PrivateRoute;
