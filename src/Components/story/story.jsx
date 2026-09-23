// src/pages/Story/Story.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Make sure this is imported
import styles from "./story.module.css";
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

function Story({ darkMode }) {
  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <ScrollToTop /> {/* ✅ Include this here */}
      <Header darkMode={darkMode} />
      <ImageStrip />
      <About darkMode={darkMode} />
    </div>
  );
}

export default Story;
