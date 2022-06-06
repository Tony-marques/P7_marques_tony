import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";

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
import AllUsers from "./pages/AllUsers/AllUsers";
import { apiUser, setHeaders } from "./Api/Api";
import AddForm from "./components/AddForm/AddForm";

const App = () => {
  // Variables
  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(null); // la je l'initialise
  const [isProfilUpdating, setIsProfilUpdating] = useState(null);
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [profilData, setProfilData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(null);
  const [USER_ID, setUSER_ID] = useState(null);

  // Fonctions
  // Contrôlé l'état du token
  const checkToken = () => {
    // Décoder le token
    const decodedToken = decodeToken(token);

    // Si le token non décodé, supprimer le token des cookies et authentifié false
    if (!decodedToken) {
      Cookies.remove("token");
      setIsAuthenticated(false);
    }

    // Si token décodé, on stock la donnée admin et userId, et authentifié true
    if (decodedToken) {
      const { userId } = decodedToken;
      const { admin } = decodedToken;
      setIsAdmin(admin);
      setUSER_ID(userId);
      setIsAuthenticated(true);
    }
  };

  // Si la variables d'authentification change, relance la fonction
  useEffect(() => {
    checkToken();
  }, [isAuthenticated]);

  // Récupérer les données du profil
  const fetchProfilData = () => {
    if (USER_ID != null) {
      axios
        .get(`${apiUser}/getoneprofil/${USER_ID}`, setHeaders(token))
        .then((res) => {
          setIsAdmin(res.data.admin);
          setProfilData(res.data);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    fetchProfilData();
  }, [isProfilUpdating, isAuthenticated, isAdmin, USER_ID]);

  return (
    <AuthContext.Provider
      value={{
        profilData,
        setProfilData,
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
            <ToastContainer
              limit={2}
              pauseOnFocusLoss={false}
              autoClose={2000}
            />
          </Router>
        </div>
        <AddForm />
      </ToggleAddContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
