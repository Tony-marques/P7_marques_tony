import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Navbar.module.scss";
import Cookies from "js-cookie";
import { useState } from "react";
import AddForm from "../AddForm/AddForm";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";

export default function Navbar() {
  // Variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { toggleAdd, setToggleAdd } = useContext(ToggleAddContext);
  const {USER_ID} = useContext(AuthContext)
  // const [toggle, setToggle] = useState(false);

  // Fonctions
  const logoutHandle = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  const toggleForm = () => {
    setToggleAdd(true);
  };

  return (
    <>
      {isAuthenticated && (
        <nav className={styles.navbar}>
          <div className={`${styles.navcontainer}`}>
            <ul>
              <NavLink to="/news">
                <li>
                  <i className="fa-solid fa-newspaper"></i>
                </li>
              </NavLink>
              <NavLink to={`/profil/${USER_ID}`}>
                <li>
                  <i className="fa-solid fa-user"></i>
                </li>
              </NavLink>
              <button className={styles.add} onClick={toggleForm}>
                <i className="fa-solid fa-square-plus"></i>
              </button>
              {toggleAdd && <AddForm />}
              <button onClick={logoutHandle} className={styles.button}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
