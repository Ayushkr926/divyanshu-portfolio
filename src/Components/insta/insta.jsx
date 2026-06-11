import { useState } from "react";
import styles from "./insta.module.css";

function Insta({ darkMode }) {
  const [message, setMessage] = useState("Get in touch");

  const handleMouseEnter = () => setMessage("Click to copy");
  const handleClick = () => {
    navigator.clipboard.writeText("divyanshucreates");
    setMessage("Copied!");
    setTimeout(() => setMessage("Get in touch"), 2000); // Reset after 2s
  };
  const handleMouseLeave = () => {
    if (message !== "Copied!") setMessage("Get in touch");
  };

  return (
    <footer
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.copy}>
        <p>GET IN TOUCH</p>
        <span>Click to copy</span>
        <span>Copied</span>
      </div>
      <br />

      <div
        className={styles.insta}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <h1 title="Click to copy username" onClick={handleClick}>
          DIVYANSHUCREATES
        </h1>
      </div>

      <br />
      <br />

      <div className={styles.tag} title="Click to copy Instagram handle">
        <p>Divyanshu Creates@2025</p>

        <nav className={styles.link}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="https://x.com/divyanshucreats"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </nav>

        <p>
          Design & Dev by <strong>Ayush Tiwari</strong>,{" "}
          <strong>Divyanshu Rai</strong>
        </p>
      </div>
    </footer>
  );
}

export default Insta;
