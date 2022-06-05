import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MetaHead from "../../components/MetaHead/MetaHead";
import styles from "./News.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import Post from "../../components/Post.js/Post";
import { apiPost, setHeaders } from "../../Api/Api";

export default function News() {
  // Variables
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const token = Cookies.get("token");

  // Contexts
  const { isPostUpdating, USER_ID, isAuthenticated, changeLike } =
    useContext(AuthContext);

  // Functions
  // Récupérer tous les posts
  const fetchData = () => {
    if (USER_ID != null) {
      const userId = USER_ID;
      axios
        .get(`${apiPost}/getallposts/${userId}`, setHeaders(token))
        .then((res) => {
          setListOfPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, isPostUpdating, USER_ID, changeLike]);

  return (
    <main className={styles.news}>
      <MetaHead title="Actualité - Groupomania" />
      <div className={styles.postsContainer}>
        {listOfPosts.length > 0 ? (
          listOfPosts
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((item) => {
              return (
                <Post item={item} key={item.id} isDataLoading={isDataLoading} />
              );
            })
        ) : (
          <p>Il n'y a actuellement aucun message.</p>
        )}
      </div>
    </main>
  );
}
