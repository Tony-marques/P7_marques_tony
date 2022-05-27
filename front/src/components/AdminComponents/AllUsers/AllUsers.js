import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState, useContext } from "react";
import { setHeaders } from "../../../Api/Api";

import { AuthContext } from "../../../contexts/AuthContext";
import User from "../User/User";
import styles from "./AllUsers.module.scss";

export default function AllUsers() {
  // Variables
  const [listOfUsers, setListOfUsers] = useState([]);
  const token = Cookies.get("token");

  const { USER_ID, userDeleted, isProfilUpdating } = useContext(AuthContext);

  // Functions
  const getAllUsers = () => {
    axios
      .post(
        "http://localhost:3000/api/user/getallusers",
        {
          userId: USER_ID,
        },
        setHeaders(token)
      )
      .then((res) => {
        setListOfUsers(res.data);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, [userDeleted, isProfilUpdating]);

  return (
    <div className={styles.usersContainer}>
      <table>
        <thead>
          <tr>
            <td>Prénom</td>
            <td>Nom</td>
            <td className={styles.email}>Email</td>
            <td className={styles.admin}>Admin</td>
            <td className={styles.delete}></td>
          </tr>
        </thead>
      </table>
      {listOfUsers &&
        listOfUsers.map((item) => {
          return <User item={item} key={item.id} />;
        })}
    </div>
  );
}
