import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import styles from "./SignIn.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUser } from "../../Api/Api";

export default function Login({ setLogin }) {
  // Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Contexts
  const { isAuthenticated } = useContext(AuthContext);

  // Functions
  const handleForm = () => {
    axios
      .post(`${apiUser}/signin`, {
        email,
        password,
      })
      .then((res) => {
        toast.success("Votre compte a été créé avec succès !");
        setLogin(true);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        console.log(error.response.data);
      });
  };

  const toggleLoginHandle = () => {
    setLogin(true);
  };

  if (isAuthenticated) {
    return <Navigate to="/news" />;
  }
  return (
    <form className={styles.form}>
      <input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="button"
        value="Créer mon compte"
        onClick={handleForm}
        className={styles.loginBtn}
      />
      <hr />
      <input
        type="button"
        value="Se connecter"
        onClick={toggleLoginHandle}
        className={styles.accountBtn}
      />
    </form>
  );
}
