import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import styles from "./Post.module.scss";
import pp from "../../assets/DefaultProfil.jpg";
import { formatDate } from "../../Utils/formatDate";
import { apiPost, setHeaders } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import Comments from "../Comments/Comments";

export default function Post({ item }) {
  // Variables
  const token = Cookies.get("token");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorsComment, setErrorsComment] = useState(false);
  const [path, setPath] = useState("");

  // Contexts
  const { setIsPostUpdating, isPostUpdating, USER_ID, isAdmin, profilData } =
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
      .then((res) => {
        setIsPostUpdating(true);
        toast.success(res.data.msg);
      })
      .catch((err) => toast.error(err.response.data.message));
    setIsPostUpdating(false);
  };

  const getCommentsByPost = () => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/comment/getcommentsbyposts/${item.id}`,
      data: {
        userId: USER_ID,
      },
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommentsByPost();
  }, [isPostUpdating]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    // et la fonction pour les commentaires
    axios
      .post(
        `http://localhost:3000/api/comment/createcomment/${item.id}`,
        {
          content: addComment,
          userId: USER_ID,
        },
        setHeaders(token)
      )
      .then((res) => {
        setIsPostUpdating(true);
        if (showComments == false) {
          setShowComments(!showComments);
        }
        setAddComment("");
        setErrorsComment(false);
      })
      .catch((error) => {
        setErrorsComment(error.response.data.errors);
        setPath(error.response.data.path);
      });
    setIsPostUpdating(false);
  };

  const updatePost = () => {
    setEdit(false);

    const formData = new FormData();
    formData.append("image", editImage);
    formData.append("content", editContent ? editContent : item.content);
    formData.append("userId", USER_ID);
    if (!editImage && editContent) {
      axios
        .put(
          `${apiPost}/updatepost/${item.id}`,
          {
            content: editContent ? editContent : item.content,
            userId: USER_ID,
          },
          setHeaders(token)
        )
        .then((res) => {
          toast.success(res.data.msg);
          setIsPostUpdating(true);
          setErrors(false);
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
          setPath(error.response.data.path);
        });
    } else if ((editImage && editContent) || editImage) {
      axios
        .put(`${apiPost}/updatepost/${item.id}`, formData, setHeaders(token))
        .then((res) => {
          toast.success(res.data.msg);
          setIsPostUpdating(true);
          setErrors(false);
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
          setPath(error.response.data.path);
        });
    } else {
      toast.error("Post non modifié");
    }
    setIsPostUpdating(false);
  };

  const like = () => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/like/createlike/${item.id}`,
      data: {
        userId: USER_ID,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <div className={styles.postProfil}>
            <img
              src={item.user.image ? item.user.image : pp}
              alt="photo de profil"
            />
            <p>
              {item.user.name} - {item.user.lastname}
            </p>
          </div>
          <div className={styles.postTitle}>
            <p>{formatDate(item.createdAt)}</p>
          </div>
        </div>
        <div className={styles.imgContainer}>
          {!edit && item.image && (
            <img
              src={item.image}
              className={styles.imgUrl}
              alt="photo du post"
            />
          )}
          {edit && item.image && (
            <>
              <img
                src={item.image}
                className={styles.imgUrl}
                alt="photo de profil"
              />
              <div className={styles.inputImgContainer}>
                <label htmlFor="img-input">
                  <i className="fa-solid fa-file-image"></i>
                </label>
                <input
                  type="file"
                  id="img-input"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </div>
            </>
          )}
        </div>
        {!edit && (
          <div className={styles.postBody}>
            {errors ? item.content : editContent ? editContent : item.content}
          </div>
        )}
        {edit && (
          <textarea
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
            className={styles.postBody}
            defaultValue={
              errors ? item.content : editContent ? editContent : item.content
            }
          ></textarea>
        )}
        {errors && path == "content" && <span>{errors}</span>}

        <div className={styles.btnContainer}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Ajouter un commentaire !"
              className={styles.comments}
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
            />
            <button
              className={styles.addComment}
              onClick={handleAddComment}
              aria-label="add comment"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className={styles.btn}>
            {item.userId == USER_ID && !edit ? (
              <button
                aria-label="update"
                onClick={() => setEdit(true)}
                className={styles.updateButton}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            ) : item.userId == USER_ID && edit ? (
              <button
                onClick={updatePost}
                aria-label="update"
                className={styles.updateButton}
              >
                <i className="fa-solid fa-circle-check"></i>
              </button>
            ) : isAdmin && !edit ? (
              <button
                aria-label="update"
                onClick={() => setEdit(true)}
                className={styles.updateButton}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            ) : isAdmin && edit ? (
              <button
                onClick={updatePost}
                aria-label="update"
                className={styles.updateButton}
              >
                <i className="fa-solid fa-circle-check"></i>
              </button>
            ) : null}

            {item.userId == USER_ID ? (
              <button onClick={deletePost} aria-label="delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            ) : isAdmin ? (
              <button onClick={deletePost} aria-label="delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            ) : null}

            <div className={styles.heartContainer} onClick={like}>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>

          {!comments.length > 0 ? null : showComments ? (
            <div onClick={handleShowComments} className={styles.btnChevron}>
              <i className="fa-solid fa-chevron-up"></i>
            </div>
          ) : (
            <div onClick={handleShowComments} className={styles.btnChevron}>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          )}
        </div>
        {errorsComment && path == "content" && <span>{errorsComment}</span>}
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
