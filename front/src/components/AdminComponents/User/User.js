import axios from "axios";
import React from "react";
import styles from "./User.module.scss";

export default function User({ item }) {
  // Functions
  const deleteUser = () => {
    console.log(item.id);
    axios.delete(`http://localhost:3000/api/user/deleteuser/${item.id}`);
  };
  return (
    <div className={styles.user}>
      {/* <div className={styles.userContainer}>
        <div className={styles.name}>Prénom: {item.name ? item.name : "Non renseigné"}</div>
        <div className={styles.lastname}>Nom: {item.lastname ? item.lastname : "Non renseigné"}</div>
        <div className={styles.age}>{item.age} ans</div>
        <div className={styles.email}>{item.email}</div>
        <i className="fa-solid fa-trash" onClick={deleteUser}></i>
      </div> */}

      <table>
        <tbody>
          <tr>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td className={styles.delete}>
              <i className="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
