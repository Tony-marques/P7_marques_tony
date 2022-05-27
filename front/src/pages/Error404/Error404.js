import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Error404.module.scss";

export default function Error404() {
  const { id } = useParams();
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/news");
  };
  return (
    <div className={styles.error404}>
      <div>La page {id} n'existe pas</div>
      <button onClick={redirect}>Revenir à la page d'accueil</button>
    </div>
  );
}
