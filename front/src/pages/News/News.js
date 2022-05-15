import React from "react";
import MetaHead from "../../components/MetaHead/MetaHead";
import styles from "./News.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Post from "../../components/Post.js/Post";
import { apiPost } from "../../Api/Api";

export default function News() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { isPostUpdating } = useContext(AuthContext);

  const fetchData = () => {
    axios
      .get(`${apiPost}/getallposts`)
      .then((res) => setListOfPosts(res.data))
      .catch(() => console.log("erreur"));
  };

  useEffect(() => {
    fetchData();
  }, [isPostUpdating]);

  return (
    <main className={styles.news}>
      <MetaHead title="Actualité - Groupomania" />{" "}
      <div className={styles.postsContainer}>
        {listOfPosts.length > 0 ? (
          listOfPosts
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((item) => {
              return <Post item={item} key={item.id} />;
            })
        ) : (
          <p>Il n'y a actuellement aucun message.</p>
        )}
      </div>
    </main>
  );
}
