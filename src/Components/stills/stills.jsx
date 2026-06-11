// src/pages/Story/Story.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Make sure this is imported
import styles from "./stills.module.css";
import Praygraj from "../praygraj/praygraj";
import Banaras from "../banaras/banaras";
import Insta from "../insta/insta";

import Header_stills from "./header/header";
import Navbar from "../Navbar/Navbar";
import Delhi from "../Delhi/delhi";
import Mau from "../Mau/Mau";

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

function Stills({ darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <ScrollToTop /> {/* ✅ Include this here */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header_stills darkMode={darkMode} />
      <Praygraj darkMode={darkMode} />
      <Banaras darkMode={darkMode} />
      <Delhi darkMode={darkMode} />
      <Mau darkMode={darkMode} />
      <Insta darkMode={darkMode} />
    </div>
  );
}

export default Stills;
