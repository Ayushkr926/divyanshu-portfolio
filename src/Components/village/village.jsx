import styles from "./village.module.css";
import villageImage from "../../assets/village1.jpg";
import villageImage2 from "../../assets/village2.png";
import villageImage3 from "../../assets/village3.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import Story from "./story/story";

function Village({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.text}>
        <h1 className={styles.heading}>
          A
          <img
            src={villageImage}
            alt="village 1"
            className={styles.image1}
          />{" "}
          tiny small <br /> village
          <img
            src={villageImage2}
            alt="village 2"
            className={styles.image2}
          />{" "}
          where it all
          <br /> Started{" "}
          <span className={styles.dots}>
            <span className={styles.dot} style={{ animationDelay: "0s" }}>
              .
            </span>
            <span className={styles.dot} style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className={styles.dot} style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </span>
          <img src={villageImage3} alt="village 3" className={styles.image3} />
        </h1>

        <p className={styles.info}>
          Divyanshu Rai (
          <span>
            <a
              href="https://www.instagram.com/divyanshucreates/"
              target="_blank"
              rel="noreferrer noopener"
              className="instalink"
            >
              @divyanshucreates
            </a>
          </span>
          ) is video creator, and storyteller based in Noida, India. With a
          background in Computer Science and a passion for visual storytelling,
          he creates cinematic travel films, documentaries, and concept-driven
          content that connects emotionally with the audience. Through this
          platform, he aims to build a creative space that blends art,
          storytelling, and tech to power his visual business ventures.
        </p>
        <button onClick={() => navigate("/story")}>Read my story</button>
      </div>
    </div>
  );
}

export default Village;
