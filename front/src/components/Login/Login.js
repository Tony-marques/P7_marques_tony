import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";

import styles from "./Login.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUser } from "../../Api/Api";

export default function Login({ setLogin }) {
  // Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Contexts
  const { setIsAuthenticated } = useContext(AuthContext);

  // Fonctions
  const handleForm = () => {
    axios
      .post(`${apiUser}/login`, {
        email,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        setIsAuthenticated(true);
        toast.success("Bienvenue sur votre espace !");
        navigate("/news");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const toggleLoginHandle = () => {
    setLogin(false);
  };

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
        value="Se connecter"
        onClick={handleForm}
        className={styles.loginBtn}
      />
      <hr />
      <input
        type="button"
        value="Créer un compte"
        onClick={toggleLoginHandle}
        className={styles.accountBtn}
      />
    </form>
  );
}
