import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MetaHead from "../../components/MetaHead/MetaHead";
import UserProfil from "../../components/UserProfil/UserProfil";
import { apiUser, setHeaders } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";
import Cookies from "js-cookie";

export default function Profil() {
  // Variables
  const [profilData, setProfilData] = useState([]);
  const { id } = useParams();
  const token = Cookies.get("token");

  // Contexts
  const { isProfilUpdating, setIsAdmin, USER_ID, profilCompleted, setProfil } =
    useContext(AuthContext);

  // Functions
  const fetchProfilData = async () => {
    if (USER_ID != null && profilData.id != "undefined") {
      const res = await axios.get(
        `${apiUser}/getoneprofil/${USER_ID}`,
        setHeaders(token)
      );
      setProfilData(res.data);
      // setProfil(res.data);
      setIsAdmin(res.data.admin);
    }
  };

  useEffect(() => {
    fetchProfilData();
  }, [isProfilUpdating, USER_ID]);

  return (
    <div>
      <MetaHead title="Profil - Groupomania" />
      <UserProfil user={profilData} key={profilData.id} />
    </div>
  );
}
