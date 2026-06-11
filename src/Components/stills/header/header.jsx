import styles from "./header.module.css";
import { useRef, useEffect } from "react";

function Header_stiils({ darkMode }) {
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.still}>
        <h1>Stills</h1>
        <h3>
          Photography immortalizes fleeting moments, etching them into our
          memories. Each photo captures our unique vision of the world, shaping
          who we are. These experiences are irreplaceable, forever treasured.
        </h3>
      </div>
    </div>
  );
}

export default Header_stiils;
