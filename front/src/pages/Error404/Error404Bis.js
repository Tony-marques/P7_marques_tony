import React from "react";
import { useNavigate } from "react-router-dom";
import MetaHead from "../../components/MetaHead/MetaHead";

import styles from "./Error404.module.scss";

export default function Error404Bis() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/news");
  };
  return (
    <div className={styles.error404}>
      <MetaHead title="Page inexistante - Groupomania" />
      <div>Cette page n'existe pas</div>
      <button onClick={redirect}>Revenir à la page d'accueil</button>
    </div>
  );
}
