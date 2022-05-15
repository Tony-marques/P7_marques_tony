import React from "react";
import { useState } from "react";
import styles from "./UserProfil.module.scss";
import "./UserProfil.scss";
import pp from "../../assets/Profil.webp";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { apiUser } from "../../Api/Api";

export default function UserProfil({ user }) {
  const [editInput, setEditInput] = useState(false);
  const { USER_ID } = useContext(AuthContext);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editAge, setEditAge] = useState("");

  const toggleEditInput = () => {
    setEditInput(!editInput);
  };

  const { setIsProfilUpdating } = useContext(AuthContext);

  const EditHandler = () => {
    const id = USER_ID;
    setEditInput(!editInput);
    if (editFirstName || editLastName || editAge) {
      axios
        .put(`${apiUser}/updateuser/${id}`, {
          name: editFirstName ? editFirstName : user.name,
          lastname: editLastName ? editLastName : user.lastname,
          age: editAge ? editAge : user.age,
        })
        .then(() => {
          toast.success("profil mis à jour");
          setIsProfilUpdating(true);
        });
    } else {
      toast.error("Les données sont identiques");
    }
    setIsProfilUpdating(false);
  };

  const editHandlerKeyDown = (e) => {
    // if (e.key === 'Enter') {
    console.log("do validate");
    // }
  };

  return (
    <div className={styles.profilContainer}>
      {!editInput ? (
        <i className="fa-solid fa-file-pen" onClick={toggleEditInput} />
      ) : (
        <i
          className="fa-solid fa-check"
          onClick={EditHandler}
          onKeyDown={editHandlerKeyDown}
        ></i>
      )}

      <img src={pp} alt="" />
      <div className={styles.firstnameContainer}>
        <div className={styles.lastname}>Nom: </div>
        {editInput ? (
          <input
            type="text"
            placeholder=""
            defaultValue={user.lastname}
            onChange={(e) => setEditLastName(e.target.value)}
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
          <input
            type="text"
            placeholder=""
            defaultValue={user.name}
            onChange={(e) => setEditFirstName(e.target.value)}
          ></input>
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
          <input
            type="text"
            placeholder=""
            defaultValue={user.age}
            onChange={(e) => setEditAge(e.target.value)}
          ></input>
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
