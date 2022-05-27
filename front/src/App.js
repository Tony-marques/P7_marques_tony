import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";

import { AuthContext } from "./contexts/AuthContext";
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import News from "./pages/News/News";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Profil from "./pages/Profil/Profil";
import Error404 from "./pages/Error404/Error404";
import { ToggleAddContext } from "./contexts/ToggleAddContext";
import PersonnalsPosts from "./pages/PersonnalsPosts/PersonnalsPosts";
import AllUsers from "./components/AdminComponents/AllUsers/AllUsers";
import { apiUser, setHeaders } from "./Api/Api";
import axios from "axios";

const App = () => {
  // Variables
  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isProfilUpdating, setIsProfilUpdating] = useState(null);
  const [profil, setProfil] = useState([]);
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(null);
  const [USER_ID, setUSER_ID] = useState(null);
  const [profilCompleted, setProfilCompleted] = useState(false);
  // Fonctions
  const checkToken = () => {
    const decodedToken = decodeToken(token);

    if (!decodedToken) {
      console.log(!decodedToken);
      console.log("non decodé");
      Cookies.remove("token");
      Cookies.remove("userId");
      setIsAuthenticated(false);
    }

    if (decodedToken) {
      console.log("decodé");

      const { userId } = decodedToken;
      const { admin } = decodedToken;
      setIsAdmin(admin);
      setUSER_ID(userId);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, [isAuthenticated]);

  const fetchProfilData = () => {
    if (USER_ID != null) {
      axios
        .get(`${apiUser}/getoneprofil/${USER_ID}`, setHeaders(token))
        .then((res) => {
          setIsAdmin(res.data.admin);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    fetchProfilData();
  }, [isProfilUpdating, isAuthenticated, isAdmin]);

  // USER_ID, isAdmin

  return (
    <AuthContext.Provider
      value={{
        // profil,
        // setProfil,
        userDeleted,
        setUserDeleted,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        isProfilUpdating,
        setIsProfilUpdating,
        isPostUpdating,
        setIsPostUpdating,
        USER_ID,
        // profilCompleted,
        // setProfilCompleted,
      }}
    >
      <ToggleAddContext.Provider value={{ toggleAdd, setToggleAdd }}>
        <div className="containerRoot">
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="/news" element={<News />} />
                <Route path="/profil/:id" element={<Profil />} />
                <Route path="/myposts" element={<PersonnalsPosts />} />
                <Route path="/:id" element={<Error404 />} />
                <Route element={<PrivateAdminRoute />}>
                  <Route path="/allusers" element={<AllUsers />} />
                </Route>
              </Route>
            </Routes>
            <ToastContainer />
          </Router>
        </div>
      </ToggleAddContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
