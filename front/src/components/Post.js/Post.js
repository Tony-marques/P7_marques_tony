import { useContext } from "react";

import Spinner from "../Spinner/Spinner";
import styles from "./Post.module.scss";
import pp from "../../assets/DefaultProfil.jpg";
import { formatDate } from "../../Utils/formatDate";
import axios from "axios";
import { apiPost } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import { Suspense } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Post({ item, isDataLoading }) {
  // Variables
  // const [isDataLoading, setIsDataLoading] = useState(false);
  const token = Cookies.get("token");

  // Contexts
  const { setIsPostUpdating, USER_ID } = useContext(AuthContext);

  // console.log(USER_ID);
  // Functions
  const deletePost = () => {
    axios
      .delete(`${apiPost}/deletepost/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: USER_ID,
        },
      })
      .then(() => {
        setIsPostUpdating(true);
        toast.success("Votre post à été supprimé !");
      })
      .catch((err) => toast.error(err.response.data.message));
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
      {item.image && <img src={item.image} className={styles.imgUrl} alt="" />}
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
    </div>
  );
}
