import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MetaHead from "../../components/MetaHead/MetaHead";
import styles from "./News.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import Post from "../../components/Post.js/Post";
import { apiPost, setHeaders } from "../../Api/Api";
import Spinner from "../../components/Spinner/Spinner";

export default function News() {
  // Variables
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const token = Cookies.get("token");

  // Contexts
  const { isPostUpdating, USER_ID } = useContext(AuthContext);

  // Functions
  const fetchData = () => {
    const userid = USER_ID;
    axios
      .post(`${apiPost}/getallposts`, { userid: userid }, setHeaders(token))
      .then((res) => {
        setListOfPosts(res.data);
        // setIsDataLoading(true);
      })
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
