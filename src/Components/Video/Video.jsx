import styles from "./Video.module.css";
import videoFile from "../../assets/Varanasi 05(1).mp4";

function Video({ darkMode }) {
  return (
    <section
      id="motion"
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.videoWrapper}>
        <video autoPlay loop muted playsInline preload="metadata" className={styles.video}>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.textOverlay}>
          DIVYANSHU CREATES <br />
          <span
            style={{ fontFamily: "'Franklin Gothic Medium', 'Arial Narrow'" }}
          >
            PHOTOGRAPHER <br />& FILMMAKER
          </span>
        </div>
      </div>
    </section>
  );
}

export default Video;
