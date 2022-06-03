import React, { useState, useContext } from "react";

import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./Home.module.scss";
import icon from "../../assets/icon-left-font-monochrome-white.svg";
import MetaHead from "../../components/MetaHead/MetaHead";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // Variables
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  // Context
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    navigate("/news");
  }

  return (
    <main className={styles.home}>
      {login ? (
        <MetaHead title="Se connecter - Groupomania" />
      ) : (
        <MetaHead title="Créer mon compte - Groupomania" />
      )}
      <div className={styles.homeWrapper}>
        <div className={styles.homeTitle}>
          <h1>Bienvenue sur </h1>
          <img src={icon} alt="logo entreprise" />
          <h2>Votre réseau social d'entreprise</h2>
        </div>
        <div className={styles.log}>
          {login ? (
            <Login setLogin={setLogin} />
          ) : (
            <SignUp setLogin={setLogin} />
          )}
        </div>
      </div>
    </main>
  );
}
