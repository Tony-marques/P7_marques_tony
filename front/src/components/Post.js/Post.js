import { useContext } from "react";

import Spinner from "../Spinner/Spinner";
import styles from "./Post.module.scss";
import pp from "../../assets/Profil.webp";
import { formatDate } from "../../Utils/formatDate";
import axios from "axios";
import { apiPost } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import { Suspense } from "react";

export default function Post({ item }) {
  // Contexts
  const { setIsPostUpdating } = useContext(AuthContext);

  // Functions
  const deletePost = () => {
    axios.delete(`${apiPost}/deletepost/${item.id}`).then(() => {
      setIsPostUpdating(true);
    });
    setIsPostUpdating(false);
  };

  return (
    <div className={styles.post}>
      <Suspense fallback={<Spinner />}>
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
            <i className="fa-solid fa-plus"></i>
          </button>
          <button onClick={deletePost}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </Suspense>
    </div>
  );
}
