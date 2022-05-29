import axios from "axios";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { apiUser } from "../../../Api/Api";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./User.module.scss";
import { setHeaders } from "../../../Api/Api";

export default function User({ item }) {
  // Variables
  const token = Cookies.get("token");

  // Context
  const { setUserDeleted, setIsProfilUpdating, USER_ID } =
    useContext(AuthContext);

  // Functions
  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/user/deleteuser/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: USER_ID,
        },
      })
      .then(() => {
        setUserDeleted(true);
      });
    setUserDeleted(false);
  };

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
      });
    setIsProfilUpdating(false);
  };

  return (
    <div className={styles.user}>
      <table>
        <tbody>
          <tr>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td className={styles.email}>{item.email}</td>
            <td className={styles.admin}>
              <select onChange={toggleAdmin}>
                {item.admin && (
                  <>
                    <option>Oui</option>
                    <option>Non</option>
                  </>
                )}
                {!item.admin && (
                  <>
                    <option>Non</option>
                    <option>Oui</option>
                  </>
                )}
              </select>
            </td>
            <td className={styles.delete} onClick={deleteUser}>
              <i className="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
