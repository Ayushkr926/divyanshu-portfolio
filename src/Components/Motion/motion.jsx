import styles from "./motion.module.css";
import { Route, Routes } from "react-router-dom";
import MotionHeader from "./header/header";
import MotionProject from "./MotionProject";
import MotionCaseStudy from "./MotionCaseStudy";
import { motionProjects } from "./projects";

function Motion({ darkMode }) {
  return (
    <main className={styles.motionPage}>
      <Routes>
        <Route index element={<><MotionHeader darkMode={darkMode} />{motionProjects.map((project) => <MotionProject key={project.slug} project={project} darkMode={darkMode} />)}</>} />
        <Route path=":slug" element={<MotionCaseStudy />} />
      </Routes>
    </main>
  );
}

export default Motion;
