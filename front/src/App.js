import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./contexts/AuthContext";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";

import "./App.scss";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import News from "./pages/News/News";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import Profil from "./pages/Profil/Profil";
import Error404 from "./pages/Error404/Error404";
import { ToggleAddContext } from "./contexts/ToggleAddContext";

const App = () => {
  // Variables
  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [toggleAdd, setToggleAdd] = useState(null);
  const [USER_ID, setUSER_ID] = useState(null);

  // Fonctions
  const checkToken = () => {
    const decodedToken = decodeToken(token);
    // console.log(USER_ID);

    if (!decodedToken) {
      Cookies.remove("token");
      Cookies.remove("userId");
      setIsAuthenticated(false);
    }

    if (decodedToken) {
      const { userId } = decodedToken;
      setUSER_ID(userId);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, USER_ID }}
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
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
            <ToastContainer />
          </Router>
        </div>
      </ToggleAddContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
