import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import { apiPost } from "../../Api/Api";
import Post from "../../components/Post.js/Post";
import { AuthContext } from "../../contexts/AuthContext";
import { ToggleAddContext } from "../../contexts/ToggleAddContext";
import styles from "./PersonnalsPosts.module.scss";

export default function PersonnalsPosts() {
  // Variables
  const [personnalsPosts, setPersonnalsPosts] = useState([]);

  // Contexts
  const { USER_ID, isPostUpdating } = useContext(AuthContext);
  const { setToggleAdd } = useContext(ToggleAddContext);

  // Functions
  const fetchPersonnalsPosts = async () => {
    const res = await axios.post(`${apiPost}/getpersonnalposts/${USER_ID}`);
    setPersonnalsPosts(res.data);
  };

  useEffect(() => {
    fetchPersonnalsPosts();
  }, [USER_ID, isPostUpdating]);

  return (
    <div className={styles.personnalsPosts}>
      {personnalsPosts.length > 0 ? (
        personnalsPosts.map((item) => {
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
  );
}
