import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import styles from "./AddForm.module.scss";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost } from "../../Api/Api";

export default function AddForm() {
  // Variables
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState("");
  const [path, setPath] = useState("");
  const token = Cookies.get("token");

  // Contexts
  const { setToggleAdd } = useContext(ToggleAddContext);
  const { USER_ID, setIsPostUpdating } = useContext(AuthContext);

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

  const closeAddForm = () => {
    setToggleAdd(false);
  };

  const uploadImg = (e) => {
    setImage(e.target.files[0]);
  };

  const addPost = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={closeAddForm}>
      <form onClick={addPost}>
        <textarea
          type="text"
          placeholder="Contenu"
          onChange={(e) => setContent(e.target.value)}
        />
        {errors && path == "content" && <span>{errors}</span>}
        <input type="file" onChange={uploadImg} id="postImg" />
        <label htmlFor="postImg">Choisir un fichier</label>
        <div className={styles.btnContainer}>
          <input type="button" value="Annuler" onClick={closeAddForm} />
          <input type="button" value="Publier" onClick={handleSend} />
        </div>
      </form>
    </div>
  );
}
