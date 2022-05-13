import React from "react";
import { useState } from "react";
import styles from "./SignIn.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login({ setLogin }) {
  // Variables
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fonctions
  const handleForm = () => {
    axios
      .post("http://localhost:3000/api/user/signin", {
        email,
        password,
      })
      .then((res) => toast.success("Compte créé !"))
      .catch((error) => toast.error(error.response.data));
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
        placeholder="Password"
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
