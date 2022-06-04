import React from "react";

import bg from "../../assets/icon-left-font-monochrome-white.png";
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <div
      className={styles.HeaderContainer}
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "contain",
      // }}
    >
      <img src={bg} alt="logo groupomania" />
    </div>
  );
}
