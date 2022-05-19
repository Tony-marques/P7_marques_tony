import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MetaHead from "../../components/MetaHead/MetaHead";
import UserProfil from "../../components/UserProfil/UserProfil";
import { apiUser } from "../../Api/Api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Profil() {
  // Variables
  const [profilData, setProfilData] = useState([]);
  const { id } = useParams();

  // Contexts
  const { isProfilUpdating } = useContext(AuthContext);

  // Functions
  const fetchProfilData = async () => {
    const response = await axios.get(`${apiUser}/getoneprofil/${id}`);
    setProfilData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchProfilData();
  }, [isProfilUpdating]);

  return (
    <div>
      <MetaHead title="Profil - Groupomania" />
      <UserProfil user={profilData} key={profilData.id} />
    </div>
  );
}
