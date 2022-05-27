import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import styles from "./AddForm.module.scss";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AddForm() {
  // Variables
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // Contexts
  const { setToggleAdd } = useContext(ToggleAddContext);
  const { USER_ID, setIsPostUpdating, profil } = useContext(AuthContext);

  // Functions
  const handleSend = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);
    formData.append("userId", USER_ID);

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
      .catch(() => {});
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
  };

  // useEffect(() => {
  //   if (profil.name === null) {
  //     // navigate(`/profil/${USER_ID}`);
  //     toast.error("test")
  //     // alert(
  //     //   "Merci de renseigner votre nom et prénom avant de pouvoir poster un message"
  //     // );
  //     setToggleAdd(false);
  //   }
  // }, []);

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
