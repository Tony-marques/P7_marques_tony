import React from "react";
import { useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
      .post("http://localhost:3000/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        // Cookies.set("userId", res.data.userId);
        setIsAuthenticated(true);
        toast.success("Vous êtes bien connecté !");
        navigate("/news");
      })
      .catch((error) => toast.error(error.response.data));
  };

  const toggleLoginHandle = () => {
    setLogin(false);
  };

  // console.log(isAuthenticated);
  if (isAuthenticated) {
    // return <Navigate to="/news" />;
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
