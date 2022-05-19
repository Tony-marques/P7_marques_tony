import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

import styles from "./AddForm.module.scss";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost } from "../../Api/Api";

export default function AddForm() {
  // Variables
  const [content, setContent] = useState("");

  // Contexts
  const { setToggleAdd } = useContext(ToggleAddContext);
  const { USER_ID, setIsPostUpdating } = useContext(AuthContext);

  // Functions
  const handleSend = () => {
    axios
      .post(`${apiPost}/createpost/${USER_ID}`, {
        content,
        // userId: USER_ID,
      })
      .then(() => setIsPostUpdating(true))
      .catch(() => console.log("error"));
    setToggleAdd(false);
    setIsPostUpdating(false);
  };

  const closeAddForm = () => {
    setToggleAdd(false);
  };

  return (
    <div className={styles.overlay} onClick={closeAddForm}>
      <form onClick={(e) => e.stopPropagation()}>
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
