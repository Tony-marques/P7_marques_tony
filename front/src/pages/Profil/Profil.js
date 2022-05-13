import React from "react";
import MetaHead from "../../components/MetaHead/MetaHead";
import styles from "./Profil.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserProfil from "../../components/UserProfil/UserProfil";

export default function Profil() {
  const [profilData, setProfilData] = useState([]);

  const { id } = useParams();

  const fetchProfilData = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/user/getoneprofil/${id}`
    );
    setProfilData(response.data);
  };

  useEffect(() => {
    fetchProfilData();
  }, []);
  // console.log(profilData);

  return (
    <div>
      <MetaHead title="Profil - Groupomania" />
      <UserProfil user={profilData} key={profilData.id} />
    </div>
  );
}
