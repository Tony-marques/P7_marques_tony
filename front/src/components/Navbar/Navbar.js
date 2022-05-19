import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./Navbar.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import AddForm from "../AddForm/AddForm";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";

export default function Navbar() {
  // Contexts
  const { isAuthenticated, setIsAuthenticated, USER_ID, isAdmin } =
    useContext(AuthContext);
  const { toggleAdd, setToggleAdd } = useContext(ToggleAddContext);

  // Functions
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
              {isAdmin && (
                <NavLink to="/allusers">
                  <i className="fa-solid fa-users"></i>
                </NavLink>
              )}
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
