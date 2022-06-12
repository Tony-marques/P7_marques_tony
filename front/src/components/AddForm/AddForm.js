import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import styles from "./AddForm.module.scss";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost, setHeaders } from "../../Api/Api";

export default function AddForm() {
  // Variables
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState("");
  const [path, setPath] = useState("");
  const token = Cookies.get("token");

  // Contexts
  const { setToggleAdd, toggleAdd } = useContext(ToggleAddContext);
  const { USER_ID, setIsPostUpdating } = useContext(AuthContext);

  // Functions
  // Créer un post
  const handleSend = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);
    formData.append("userId", USER_ID);

    axios
      .post(`${apiPost}/createpost/${USER_ID}`, formData, setHeaders(token))
      .then(() => {
        setIsPostUpdating(true);
        toast.success("Post créé avec succès !");
        setToggleAdd(false);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        setPath(error.response.data.path);
      });

    setIsPostUpdating(false);
  };

  // Toggle pour ouvrir / fermer la création d'un post
  const closeAddForm = () => {
    setToggleAdd(false);
  };

  // Récupérer l'image
  const uploadImg = (e) => {
    setImage(e.target.files[0]);
  };

  return createPortal(
    <>
      {toggleAdd && (
        <div className={styles.overlay} onClick={closeAddForm}>
          <form onClick={(e) => e.stopPropagation()}>
            <textarea
              type="text"
              placeholder="Contenu"
              onChange={(e) => setContent(e.target.value)}
            />
            {errors && path == "content" && <span>{errors}</span>}
            <input type="file" onChange={uploadImg} id="postImg" />
            <label htmlFor="postImg">Choisir un fichier</label>
            <div className={styles.btnContainer}>
              <input type="button" value="Annuler" onClick={closeAddForm} className={styles.cancel}/>
              <input type="button" value="Publier" onClick={handleSend} className={styles.publish}/>
            </div>
          </form>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
}

