import styles from "./about.module.css";
import { useState } from "react";
import image from "../../../../assets/profile.jpg";

function About({ darkMode }) {
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.about}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h1>
              Let's create<br></br> beautiful things.
            </h1>
            <img src={image} alt="" />
          </div>
        </div>

        <div className={styles.right}>
          <p>
            The rhythm of village life in Uttar Pradesh and the raw, unfiltered
            visuals around me shaped the way I see the world. I never had to
            imagine beauty — I saw it in everyday moments. The simplicity, the
            chaos, the quiet — it all made its way into my camera frame.
            <br></br> <br />
            I’ve always been drawn to artistic mediums that evoke emotion, and
            when I picked up a camera for the first time, it felt like magic.
            Filmmaking became my way of speaking without saying much — letting
            visuals do the storytelling. My style? Colorful, calm, cinematic —
            yet always moving. I don’t just record moments, I experience them,
            and bring them to life on screen. Driven by curiosity and a passion
            for culture, I dream of traveling across the raw and diverse
            landscape of India — capturing stories that feel real and rooted.
            One day, I hope to film in Antarctica too — chasing silence, space,
            and extremes.<br></br> <br></br> Along the way, I’ve found love for
            film photography, editing, design, music, and sometimes… hunting for
            the best chai and street food around. This journey hasn’t been easy
            — sleepless edits, gear issues, tight budgets — but it's worth every
            bit. Because every frame I create is a piece of how I see the world.
            And through this lens, I invite you to see it with me — one story at
            a time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
