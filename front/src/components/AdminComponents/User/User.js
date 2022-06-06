import axios from "axios";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { apiUser } from "../../../Api/Api";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./User.module.scss";
import { setHeaders } from "../../../Api/Api";
import pp from "../../../assets/DefaultProfil.jpg";

export default function User({ item }) {
  // Variables
  const token = Cookies.get("token");

  // Context
  const { setUserDeleted, setIsProfilUpdating, USER_ID } =
    useContext(AuthContext);

  // Functions
  // Supprimer un user
  const deleteUser = () => {
    axios
      .delete(`${apiUser}/deleteuser/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: USER_ID,
        },
      })
      .then(() => {
        setUserDeleted(true);
        toast.success(`L'utilisateur ${item.name} a été supprimé`);
      })
      .catch((err) => {
        toast.success(`Impossible de supprimer l'utilisateur`);
      });
    setUserDeleted(false);
  };

  // changement status admin / user
  const toggleAdmin = () => {
    axios
      .put(
        `${apiUser}/toggleAdmin/${item.id}`,
        {
          ...item,
          admin: !item.admin,
          userId: USER_ID,
        },
        setHeaders(token)
      )
      .then((user) => {
        setIsProfilUpdating(true);
        if (user.data.newUser.admin) {
          toast.success(
            `L'utilisateur ${user.data.newUser.id} vient de passer admin.`
          );
        } else {
          toast.success(
            `L'utilisateur ${user.data.newUser.id} n'est plus admin.`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsProfilUpdating(false);
  };

  return (
    <div className={styles.user}>
      <img src={item.image ? item.image : pp} alt="" className={styles.pp} />
      <div className={styles.userInfos}>
        <div className={styles.top}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.lastname}>{item.lastname}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.email}>{item.email}</div>
          <div className={styles.admin}>
            <select onChange={toggleAdmin}>
              {item.admin && (
                <>
                  <option>Admin</option>
                  <option>User</option>
                </>
              )}
              {!item.admin && (
                <>
                  <option>User</option>
                  <option>Admin</option>
                </>
              )}
            </select>
          </div>
          <div className={styles.delete} onClick={deleteUser}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
