import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const PrivateAdminRoute = () => {
  const { isAdmin } = useContext(AuthContext);
  console.log(isAdmin);

  return isAdmin === false ? <Navigate to="/news" /> : <Outlet />;
};

export default PrivateAdminRoute;

// je te montre sur mon site
// vu que je suis pas admin la
// je pense sa merde par l'url car je recharge la page
// mais quand je click sur le bouton sa fonctionne
// je dois pouvoir réglé ça mais j'avais pas encore vu xD
// donc voilà t'as les grandes lignes ah?
// Ouai mais en vrai je trouve c'est accessible, c'est surtout les fonctionnalités qui m'importe en vrai
// plus que le like a faire, je galère aussi en sequelize mdr