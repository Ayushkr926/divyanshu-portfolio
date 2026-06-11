import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom"; // ✅ Import this
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
        <a href="">MOTION</a>
        <Link to="/story">About</Link>
      </div>

      <div className={styles.center}>
        <a href="/" className={styles.titleLink}>
          Divyanshu Creates
        </a>
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
