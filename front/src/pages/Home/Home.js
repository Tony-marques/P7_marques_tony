import React, { useState } from "react";

import Login from "../../components/Login/Login";
import SignIn from "../../components/SignIn/SignIn";
import styles from "./Home.module.scss";
import icon from "../../assets/icon-left-font-monochrome-white.svg";
import MetaHead from "../../components/MetaHead/MetaHead";

export default function Home() {
  // Variables
  const [login, setLogin] = useState(true);

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
          <img src={icon} alt="" />
          <h2>Votre réseau social d'entreprise</h2>
        </div>
        <div>
          {login ? (
            <Login setLogin={setLogin} />
          ) : (
            <SignIn setLogin={setLogin} />
          )}
        </div>
      </div>
    </main>
  );
}
