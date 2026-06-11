// src/pages/Story/Story.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Make sure this is imported
import styles from "./story.module.css";
import Navbar from "../../Navbar/Navbar";
import Header from "./header/header";
import ImageStrip from "./header/Image";
import About from "./About/about";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // ✅ Smooth scrolling to top
    });
  }, [location.pathname]);

  return null;
}

function Story({ darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <ScrollToTop /> {/* ✅ Include this here */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <ImageStrip />
      <About darkMode={darkMode} />
    </div>
  );
}

export default Story;
