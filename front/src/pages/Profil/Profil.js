import React, {  useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MetaHead from "../../components/MetaHead/MetaHead";
import UserProfil from "../../components/UserProfil/UserProfil";
import { apiUser, setHeaders } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";


export default function Profil() {
  // Variables
  const token = Cookies.get("token");

  // Contexts
  const { isProfilUpdating, setIsAdmin, USER_ID, profilData, isAuthenticated } =
    useContext(AuthContext);

  // Functions
  const fetchProfilData = async () => {
    if (USER_ID != null && profilData.id != "undefined") {
      const res = await axios.get(
        `${apiUser}/getoneprofil/${USER_ID}`,
        setHeaders(token)
      );
      setIsAdmin(res.data.admin);
    }
  };

  useEffect(() => {
    fetchProfilData();
  }, [isProfilUpdating, USER_ID, isAuthenticated]);

  return (
    <>
      <MetaHead title="Profil - Groupomania" />
      <UserProfil user={profilData} key={profilData.id} />
    </>
  );
}
