import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./UserProfil.module.scss";
import "./UserProfil.scss";
import pp from "../../assets/DefaultProfil.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUser, setHeaders } from "../../Api/Api";
import { useEffect } from "react";

export default function UserProfil({ user }) {
  // Variables
  const [editInput, setEditInput] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editBio, setEditBio] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  // Contexts
  const {
    setIsAuthenticated,
    setIsProfilUpdating,
    USER_ID,
    setProfilCompleted,

    profil,
  } = useContext(AuthContext);

  // Functions
  const toggleEditInput = () => {
    setEditInput(!editInput);
  };

  const EditHandler = () => {
    const id = USER_ID;
    setEditInput(!editInput);
    if (editFirstName || editLastName || editAge || editBio) {
      axios
        .put(
          `${apiUser}/updateuser/${id}`,
          {
            name: editFirstName ? editFirstName : user.name,
            lastname: editLastName ? editLastName : user.lastname,
            age: editAge ? editAge : user.age,
            bio: editBio ? editBio : user.bio,
          },
          setHeaders(token) // ??
        )
        .then(() => {
          toast.success("Votre profil a été mis à jour");
          setIsProfilUpdating(true);
        });
    } else {
      toast.error("Les données sont identiques");
    }
    setIsProfilUpdating(false);
  };

  const showPersonnalPosts = () => {
    navigate("/myposts");
  };

  const deleteMyAccount = () => {
    if (
      window.confirm(
        "Etes-vous sur de vouloir supprimer votre compte ? \nCeci entrainera également la suppression de vos données."
      )
    ) {
      setIsAuthenticated(false);
      Cookies.remove("token");
      axios
        .delete(`${apiUser}/deletemyprofil/${user.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            userId: USER_ID,
          },
        })
        .then(() => {});
      navigate("/");
    }
  };

  // useEffect(() => {
  //   if (profil.name == null || profil.lastname == null) {
  //     // navigate(`/profil/${USER_ID}`);
  //     setProfilCompleted(false);
  //   } else {
  //     setProfilCompleted(true);
  //   }
  // }, []);

  return (
    <div className={styles.profilContainer}>
      {!editInput ? (
        <i className="fa-solid fa-file-pen" onClick={toggleEditInput} />
      ) : (
        <i className="fa-solid fa-check" onClick={EditHandler}></i>
      )}

      <img src={pp} alt="" />
      <div className={styles.infosContainer}>
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
              <div className={styles.lastnameInput}>{user.lastname}</div>
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
              <div className={styles.ageInput}>
                {user.age ? user.age + " " + "ans" : null}
              </div>
            </>
          )}
        </div>
        <div className={styles.bioContainer}>
          <div className={styles.bio}>Bio: </div>
          {editInput ? (
            <input
              type="text"
              placeholder=""
              defaultValue={user.bio}
              onChange={(e) => setEditBio(e.target.value)}
            ></input>
          ) : (
            <>
              {" "}
              <div className={styles.bioInput}>{user.bio}</div>
            </>
          )}
        </div>
        <div className={styles.roleContainer}>
          <div className={styles.role}>Rôle: </div>

          <div className={styles.roleInput}>
            {user.admin ? "Admin" : "User"}
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={showPersonnalPosts}
          className={`${styles.btn} ${styles.postsBtn}`}
        >
          Voir mes posts
        </button>
        <button
          onClick={deleteMyAccount}
          className={`${styles.btn} ${styles.deleteBtn}`}
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}

const options = {
  headers: {
    Authorization: "Bearer my-token",
    "My-Custom-Header": "foobar",
  },
};
