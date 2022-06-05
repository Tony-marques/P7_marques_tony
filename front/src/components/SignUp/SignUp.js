import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import styles from "./SignUp.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUser } from "../../Api/Api";

export default function Login({ setLogin }) {
  // Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState("");
  const [path, setPath] = useState("");

  // Contexts
  const { isAuthenticated } = useContext(AuthContext);

  // Functions
  // Soumettre l'enregistrement du compte
  const handleForm = () => {
    axios
      .post(`${apiUser}/signup`, {
        email,
        password,
        name: firstname,
        lastname,
      })
      .then((res) => {
        toast.success("Votre compte a été créé avec succès !");
        setLogin(true);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        setPath(error.response.data.path);
        toast.error(error.response.data);
      });
  };

  // Bascule login / signUp
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
      {errors && path == "email" && <span>{errors}</span>}
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors && path == "password" && <span>{errors}</span>}
      <input
        type="text"
        placeholder="Nom"
        onChange={(e) => setLastname(e.target.value)}
      />
      {errors && path == "lastname" && <span>{errors}</span>}
      <input
        type="text"
        placeholder="Prénom"
        onChange={(e) => setFirstname(e.target.value)}
      />
      {errors && path == "name" && <span>{errors}</span>}
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
