import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

import styles from "./AddForm.module.scss";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost } from "../../Api/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function AddForm() {
  // Variables
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const token = Cookies.get("token");

  // Contexts
  const { setToggleAdd } = useContext(ToggleAddContext);
  const { USER_ID, setIsPostUpdating } = useContext(AuthContext);

  console.log(image);

  // Functions
  const handleSend = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiPost}/createpost/${USER_ID}`, formData, options)
      .then(
        () => setIsPostUpdating(true),
        toast.success("Post créé avec succès !")
      )
      .catch(() => console.log("error"));
    setToggleAdd(false);
    setIsPostUpdating(false);
  };

  const closeAddForm = () => {
    setToggleAdd(false);
  };

  const uploadImg = (e) => {
    setImage(e.target.files[0]);
  };

  const addPost = (e) => {
    e.stopPropagation();
    console.log("test");
  };

  return (
    <div className={styles.overlay} onClick={closeAddForm}>
      <form onClick={addPost}>
        <textarea
          type="text"
          placeholder="Contenu"
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" onChange={uploadImg} />
        <div className={styles.btnContainer}>
          <input type="button" value="Annuler" onClick={closeAddForm} />
          <input type="button" value="Publier" onClick={handleSend} />
        </div>
      </form>
    </div>
  );
}
