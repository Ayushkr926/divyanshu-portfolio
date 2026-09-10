import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`${styles.Navbar} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.left}>
        <Link to="/stills">STILLS</Link>
        <Link to="/#motion">MOTION</Link>
        <Link to="/story">About</Link>
      </div>

      <div className={styles.center}>
        <Link to="/" className={styles.titleLink}>
          Divyanshu Creates
        </Link>
      </div>

      <div className={styles.right}>
        <a href="https://www.instagram.com/divyanshucreates/">INSTAGRAM</a>
        <a href="mailto:divyanshucreatess@gmail.com">EMAIL</a>
        <button onClick={toggleTheme} className={styles.toggleBtn}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
