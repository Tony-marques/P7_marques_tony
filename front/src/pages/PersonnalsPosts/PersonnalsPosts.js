import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useContext } from "react";

import { apiPost, setHeaders } from "../../Api/Api";
import Post from "../../components/Post.js/Post";
import { AuthContext } from "../../contexts/AuthContext";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import styles from "./PersonnalsPosts.module.scss";

export default function PersonnalsPosts() {
  // Variables
  const [personnalsPosts, setPersonnalsPosts] = useState([]);
  const token = Cookies.get("token");

  // Contexts
  const { USER_ID, isPostUpdating } = useContext(AuthContext);
  const { setToggleAdd } = useContext(ToggleAddContext);

  // Functions
  // Récupérerses propres posts
  const fetchPersonnalsPosts = () => {
    if (USER_ID != null) {
      axios
        .get(
          `${apiPost}/getpersonnalposts/${USER_ID}`,
          // {
          //   userId: USER_ID,
          // },
          setHeaders(token)
        )
        .then((res) => {
          setPersonnalsPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchPersonnalsPosts();
  }, [USER_ID, isPostUpdating]);

  return (
    <div className={styles.personnalsPosts}>
      <div className={styles.postsContainer}>
        {personnalsPosts.length > 0 ? (
          personnalsPosts
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((item) => {
              return <Post item={item} key={item.id} />;
            })
        ) : (
          <div className={styles.emptyPost}>
            <p>Vous n'avez pas encore créé de post</p>
            <button onClick={() => setToggleAdd(true)}>
              Créer votre premier post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
