import React from "react";
import { useContext } from "react";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import styles from "./AddForm.module.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function AddForm() {
  const { toggleAdd, setToggleAdd } = useContext(ToggleAddContext);
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const { USER_ID } = useContext(AuthContext);
  // const userId = Cookies.get("userId");
  // console.log(userId);

  const handleSend = () => {
    axios
      .post("http://localhost:3000/api/post/createpost", {
        author,
        content,
        userId: USER_ID,
      })
      .then(() => document.location.reload())
      .catch(() => console.log("error"));
    setToggleAdd(false);
  };

  const closeAddForm = () => {
    setToggleAdd(false);
  };

  return (
    <div className={styles.overlay} onClick={closeAddForm}>
      <form onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Auteur"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Contenu"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.btnContainer}>
          <input type="button" value="Annuler" onClick={closeAddForm} />
          <input type="button" value="Publier" onClick={handleSend} />
        </div>
      </form>
    </div>
  );
}
