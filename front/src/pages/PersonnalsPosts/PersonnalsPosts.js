import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import { apiPost } from "../../Api/Api";
import Post from "../../components/Post.js/Post";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./PersonnalsPosts.module.scss";

export default function PersonnalsPosts() {
  // Variables
  const [personnalsPosts, setPersonnalsPosts] = useState([]);

  // Contexts
  const { USER_ID } = useContext(AuthContext);

  // Functions
  const fetchPersonnalsPosts = () => {
    axios.post(`${apiPost}/getpersonnalposts/${USER_ID}`).then((res) => {
      setPersonnalsPosts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchPersonnalsPosts();
  }, []);

  return (
    <div className={styles.personnalsPosts}>
      {personnalsPosts &&
        personnalsPosts.map((item) => {
          return <Post item={item} key={item.id} />;
        })}
    </div>
  );
}
