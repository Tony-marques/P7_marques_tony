import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState, useContext } from "react";

import { apiUser, setHeaders } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import MetaHead from "../../components/MetaHead/MetaHead";
import User from "../../components/AdminComponents/User/User";
import styles from "./AllUsers.module.scss";

export default function AllUsers() {
  // Variables
  const [listOfUsers, setListOfUsers] = useState([]);
  const token = Cookies.get("token");

  // Contexts
  const { USER_ID, userDeleted, isProfilUpdating } = useContext(AuthContext);

  // Functions
  // Récupérer tous les utilisateurs
  const getAllUsers = () => {
    axios
      .get(
        `${apiUser}/getallusers/${USER_ID}`,
        // {
        //   userId: USER_ID,
        // },
        setHeaders(token),
      )
      .then((res) => {
        setListOfUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dès qu'un user est supprimé ou qu'un profil est mis à jour, relance la fonction
  useEffect(() => {
    getAllUsers();
  }, [userDeleted, isProfilUpdating]);
  return (
    <div className={styles.usersContainer}>
      <MetaHead title="Dashboard admin - Groupomania" />
      {listOfUsers &&
        listOfUsers.map((item) => {
          return <User item={item} key={item.id} />;
        })}
    </div>
  );
}
