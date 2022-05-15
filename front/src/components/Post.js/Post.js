import React from "react";
import styles from "./Post.module.scss";
import pp from "../../assets/Profil.webp";
import { formatDate } from "../../Utils/formatDate";
import axios from "axios";
import { apiPost } from "../../Api/Api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Post({ item }) {
  const { setIsPostUpdating } = useContext(AuthContext);
  const deletePost = () => {
    axios.delete(`${apiPost}/deletepost/${item.id}`).then(() => {
      setIsPostUpdating(true);
    });
    setIsPostUpdating(false);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.postProfil}>
          <img src={pp} alt="" />
          <p>{item.author}</p>
        </div>
        <div className={styles.postTitle}>
          <p>{formatDate(item.createdAt)}</p>
        </div>
      </div>
      <div className={styles.postBody}>{item.content}</div>
      <div className={styles.btnContainer}>
        <input
          type="text"
          placeholder="Ajouter un commentaire !"
          className={styles.comments}
        />
        <button className={styles.update}>
          <i className="fa-solid fa-file-pen"></i>
        </button>
        <button onClick={deletePost}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
