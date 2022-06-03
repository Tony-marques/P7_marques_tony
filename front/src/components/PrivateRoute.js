import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated === false ? <Navigate to="/" /> : <Outlet />; 
};

export default PrivateRoute;
