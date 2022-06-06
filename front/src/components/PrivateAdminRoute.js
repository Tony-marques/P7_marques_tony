import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const PrivateAdminRoute = () => {
  const { isAdmin } = useContext(AuthContext);

  // return isAdmin === false ? <Navigate to="/news" /> : <Outlet />;
  return isAdmin ? <Outlet /> : <Navigate to="/allusers" />;
};

export default PrivateAdminRoute;
