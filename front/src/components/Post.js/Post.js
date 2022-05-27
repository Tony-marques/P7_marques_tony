import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import styles from "./Post.module.scss";
import pp from "../../assets/DefaultProfil.jpg";
import { formatDate } from "../../Utils/formatDate";
import { apiPost } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import Comments from "../Comments/Comments";
import { useState } from "react";
import { useEffect } from "react";

export default function Post({ item }) {
  // Variables
  const token = Cookies.get("token");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState("");

  // Contexts
  const { setIsPostUpdating, isPostUpdating, USER_ID, isAdmin } =
    useContext(AuthContext);

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

  const getCommentsByPost = () => {
    axios
      .get(`http://localhost:3000/api/comment/getcommentsbyposts/${item.id}`)
      .then((res) => {
        setComments(res.data.comments);
      });
  };

  useEffect(() => {
    getCommentsByPost();
  }, [isPostUpdating]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    axios
      .post(`http://localhost:3000/api/comment/createcomment/${item.id}`, {
        content: addComment,
        userId: USER_ID,
      })
      .then((res) => {
        setIsPostUpdating(true);
        if (showComments == false) {
          setShowComments(!showComments);
        }
        setAddComment("");
      });
    setIsPostUpdating(false);
  };



  return (
    <div className={styles.postContainer}>
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
        {item.image && (
          <img src={item.image} className={styles.imgUrl} alt="" />
        )}
        <div className={styles.postBody}>{item.content}</div>
        <div className={styles.btnContainer}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Ajouter un commentaire !"
              className={styles.comments}
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
            />
            <button className={styles.addComment} onClick={handleAddComment}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          {item.userId == USER_ID ? (
            <button onClick={deletePost}>
              <i className="fa-solid fa-trash"></i>
            </button>
          ) : isAdmin ? (
            <button onClick={deletePost}>
              <i className="fa-solid fa-trash"></i>
            </button>
          ) : null}
          {!comments.length > 0 ? null : showComments ? (
            <button onClick={handleShowComments}>
              <i className="fa-solid fa-chevron-up"></i>
            </button>
          ) : (
            <button onClick={handleShowComments}>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          )}
        </div>
      </div>
      {showComments && (
        <div
          className={` ${
            showComments
              ? `${styles.commentsWall} ${styles.appear}`
              : styles.commentsWall
          }`}
        >
          {comments.map((item) => {
            return (
              <Comments
                item={item}
                key={item.id}
                showComments={showComments}
                setShowComments={setShowComments}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
