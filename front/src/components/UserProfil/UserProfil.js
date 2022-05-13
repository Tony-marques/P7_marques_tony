import React from "react";
import { useState } from "react";
import styles from "./UserProfil.module.scss";
import "./UserProfil.scss";
import pp from "../../assets/Profil.webp";
import { useRef } from "react";
import { useEffect } from "react";

export default function UserProfil({ user }) {
  const [editInput, setEditInput] = useState(false);


  const toggleEditInput = () => {
    setEditInput(!editInput);
  };




  return (
    <div className={styles.profilContainer}>
      {!editInput ? (
        <i className="fa-solid fa-file-pen" onClick={toggleEditInput} />
      ) : (
        <i className="fa-solid fa-check" onClick={toggleEditInput}></i>
      )}

      <img src={pp} alt="" />
      <div className={styles.firstnameContainer}>
        <div className={styles.lastname}>Nom: </div>
        {editInput ? (
          <input
            type="text"
            placeholder=""
            defaultValue={user.lastname}
          ></input>
        ) : (
          <>
            {" "}
            <div className={styles.lastnameInput}>{user.lastname} </div>
          </>
        )}
      </div>

      <div className={styles.firstnameContainer}>
        <div className={styles.firstname}>Prénom: </div>
        {editInput ? (
          <input type="text" placeholder="" defaultValue={user.name}></input>
        ) : (
          <>
            {" "}
            <div className={styles.firstnameInput}>{user.name} </div>
          </>
        )}
      </div>

      <div className={styles.ageContainer}>
        <div className={styles.age}>Age: </div>
        {editInput ? (
          <input type="text" placeholder="" defaultValue={user.age}></input>
        ) : (
          <>
            {" "}
            <div className={styles.ageInput}>{user.age} ans</div>
          </>
        )}
      </div>
    </div>
  );
}
