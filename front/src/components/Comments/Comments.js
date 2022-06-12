import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import styles from "./Comments.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { formatDate } from "../../Utils/formatDate";
import pp from "../../assets/DefaultProfil.jpg";
import { apiComment } from "../../Api/Api";

export default function Comments({ item, setShowComments }) {
  // Variables
  const token = Cookies.get("token");

  // Contexts
  const { USER_ID, setIsPostUpdating, isAdmin } = useContext(AuthContext);

  // Functions
  // Supprimer un commentaire
  const deleteComment = () => {
    axios
      .delete(`${apiComment}/deletecomment/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: USER_ID,
        },
      })
      .then(() => {
        setIsPostUpdating(true);
        setShowComments(false);
        toast.success("Le commentaire a été supprimé.");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsPostUpdating(false);
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.comment}>
        <div className={styles.commentHead}>
          <div className={styles.commentProfil}>
            <img
              src={item.user.image ? item.user.image : pp}
              alt="photo de profil"
            />
          </div>
          <div className={styles.commentName}>
            <div className={styles.name}>
              {item.user.name} - {item.user.lastname}
            </div>
            <div className={styles.date}>{formatDate(item.createdAt)}</div>
          </div>
          <div className={styles.btnContainer}>
            {item.userId == USER_ID ? (
              <button onClick={deleteComment}>
                <i className="fa-solid fa-trash"></i>
              </button>
            ) : isAdmin ? (
              <button onClick={deleteComment}>
                <i className="fa-solid fa-trash"></i>
              </button>
            ) : null}
          </div>
        </div>
        <div className={styles.commentBottom}>
          <div className={styles.commentBody}>{item.content}</div>
        </div>
      </div>
    </div>
  );
}
