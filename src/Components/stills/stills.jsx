// src/pages/Story/Story.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Make sure this is imported
import styles from "./stills.module.css";

import Header_stills from "./header/header";
import TravelStill from "./TravelStill";
import { stillProjects } from "./stillProjects";

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

function Stills({ darkMode }) {
  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <ScrollToTop /> {/* ✅ Include this here */}
      <Header_stills darkMode={darkMode} />
      {stillProjects.map((project) => (
        <TravelStill key={project.slug} project={project} darkMode={darkMode} />
      ))}
    </div>
  );
}

export default Stills;
