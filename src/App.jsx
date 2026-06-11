// src/App.jsx
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Video from "./Components/Video/Video";
import Village from "./Components/village/village";
import Praygraj from "./Components/praygraj/praygraj";
import Banaras from "./Components/banaras/banaras";
import Kumbh from "./Components/Kumbh/Kumbh";
import Insta from "./Components/insta/insta";
import Story from "./Components/village/story/story";
import Stills from "./Components/stills/stills";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <div className="grain">
        <div className="grain-texture"></div>
      </div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Video darkMode={darkMode} setDarkMode={setDarkMode} />
              <Village darkMode={darkMode} setDarkMode={setDarkMode} />
              <Praygraj darkMode={darkMode} setDarkMode={setDarkMode} />
              <Banaras darkMode={darkMode} setDarkMode={setDarkMode} />
              <Kumbh darkMode={darkMode} setDarkMode={setDarkMode} />
              <Insta darkMode={darkMode} setDarkMode={setDarkMode} />
            </>
          }
        />
        <Route
          path="/story"
          element={<Story darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/stills"
          element={<Stills darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </div>
  );
}

export default App;
