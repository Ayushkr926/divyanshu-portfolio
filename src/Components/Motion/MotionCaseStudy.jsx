import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motionProjects } from "./projects";
import styles from "./MotionCaseStudy.module.css";

function MotionCaseStudy() {
  const { slug } = useParams();
  const project = motionProjects.find((item) => item.slug === slug);
  const [isWatchHover, setIsWatchHover] = useState(false);

  if (!project) {
    return <main className={`${styles.caseStudy} ${styles.notFound}`}><Link className={styles.back} to="/motion">Back to Motion</Link><h1 className={styles.notFoundTitle}>Case study not found.</h1></main>;
  }

  const galleryImages = [...project.images, ...project.images];

  return (
    <main className={styles.caseStudy}>
      <section className={styles.heroShell}>
        <section className={`${styles.hero} ${isWatchHover ? styles.heroWatching : ""}`}>
          <img className={styles.projectImage} src={project.images[0]} alt={project.title} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{project.title}</h1>
            <button type="button" className={styles.watchButton} onMouseEnter={() => setIsWatchHover(true)} onMouseLeave={() => setIsWatchHover(false)} onFocus={() => setIsWatchHover(true)} onBlur={() => setIsWatchHover(false)}>
              <span>{isWatchHover ? "WATCH VIDEO" : "WATCH"}</span><span className={styles.playIcon} aria-hidden="true">▶</span>
            </button>
          </div>
        </section>
      </section>
      <section className={styles.projectInfo}>
        <div className={styles.details}>
          <div><span>DATE</span><strong>{project.date}</strong></div>
          <i aria-hidden="true" />
          <div><span>LOCATION</span><strong>{project.label}</strong></div>
        </div>
        <p className={styles.description}>{project.description}</p>
      </section>
      <section className={styles.gallery} aria-label={`${project.title} gallery`}>
        {galleryImages.map((image, index) => <img key={`${image}-${index}`} src={image} alt="" loading="lazy" />)}
      </section>
      <section className={styles.credit}><span>DIRECTOR</span><strong>DIVYANSHU RAI</strong><i aria-hidden="true" /></section>
    </main>
  );
}

export default MotionCaseStudy;
