import React from "react";
import { formatDate } from "../../Utils/formatDate";
import pp from "../../assets/DefaultProfil.jpg";

import styles from "./Comments.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Comments({ item, showComments, setShowComments }) {
  // Variables
  const token = Cookies.get("token");

  // Contexts
  const { USER_ID, setIsPostUpdating, isAdmin } = useContext(AuthContext);

  // Functions
  const deleteComment = () => {
    axios
      .delete(`http://localhost:3000/api/comment/deletecomment/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: USER_ID,
        },
      })
      .then(() => {
        setIsPostUpdating(true);
        toast.success("Le commentaire a été supprimé.");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsPostUpdating(false);
  };
  // console.log(item);

  // if (!item) {
  //   setShowComments(false);
  // }

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.comment}>
        <div className={styles.commentHead}>
          <div className={styles.commentProfil}>
            <img src={pp} alt="" />
            <div className={styles.name}>{item.user.name}</div>
          </div>
          <div className={styles.date}>{formatDate(item.createdAt)}</div>
        </div>
        <div className={styles.commentBottom}>
          <div className={styles.commentBody}>{item.content}</div>
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
      </div>
    </div>
  );
}
