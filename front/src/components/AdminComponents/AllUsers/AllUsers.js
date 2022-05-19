import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "../User/User";
import styles from "./AllUsers.module.scss";

export default function AllUsers() {
  // Variables
  const [listOfUsers, setListOfUsers] = useState([]);

  // Functions
  const getAllUsers = () => {
    axios.get("http://localhost:3000/api/user/getallusers").then((res) => {
      setListOfUsers(res.data);
      // console.log(res.data);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={styles.usersContainer}>
      <table>
        <thead>
          <tr>
            <td>Prénom</td>
            <td>Nom</td>
            <td>Email</td>
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
