import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MetaHead from "../../components/MetaHead/MetaHead";
import styles from "./News.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import Post from "../../components/Post.js/Post";
import { apiPost, setHeaders } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function News() {
  // Variables
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // Contexts
  const {
    isPostUpdating,
    USER_ID,
    isAuthenticated,
    profil,
    setProfilCompleted,
  } = useContext(AuthContext);

  // Functions
  const fetchData = () => {
    if (USER_ID != null) {
      const userId = USER_ID;
      axios
        .post(`${apiPost}/getallposts`, { userId: userId }, setHeaders(token))
        .then((res) => {
          setListOfPosts(res.data);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, isPostUpdating, USER_ID]);

  // console.log();
  // useEffect(() => {
  //   if (profil.name == null || profil.lastname == null) {
  //     navigate(`/profil/${USER_ID}`);
  //     setProfilCompleted(false);
  //   } else {
  //     setProfilCompleted(true);
  //   }
  // }, []);

  return (
    <main className={styles.news}>
      <MetaHead title="Actualité - Groupomania" />{" "}
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
