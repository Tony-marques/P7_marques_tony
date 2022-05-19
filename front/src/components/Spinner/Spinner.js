import React from "react";

import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <svg class={styles.spinner} viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  );
}
