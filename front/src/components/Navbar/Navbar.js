import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./Navbar.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import bg from "../../assets/icon-left-font-monochrome-white.png";

export default function Navbar() {
  // Contexts
  const { isAuthenticated, setIsAuthenticated, USER_ID, isAdmin } =
    useContext(AuthContext);
  const { setToggleAdd } = useContext(ToggleAddContext);

  // Functions
  // Se deconnecter
  const logoutHandle = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  // Permet de gérer la modale ajouter un post
  const toggleForm = () => {
    setToggleAdd(true);
  };

  return (
    <>
      {isAuthenticated && (
        <nav className={styles.navbar}>
          <div
            className={styles.bgContainerold}
          >
            <img className={styles.bgContainer} src={bg} alt="" />
          </div>
          <div className={`${styles.navcontainer}`}>
            <ul>
              <li>
                <NavLink to="/news" aria-label="news">
                  <i className="fa-solid fa-newspaper"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/profil/${USER_ID}`} aria-label="profil">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>

              <li className={styles.add} onClick={toggleForm}>
                <i className="fa-solid fa-square-plus"></i>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/allusers" aria-label="all users">
                    <i className="fa-solid fa-users"></i>
                  </NavLink>
                </li>
              )}
              <li onClick={logoutHandle} className={styles.button}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
