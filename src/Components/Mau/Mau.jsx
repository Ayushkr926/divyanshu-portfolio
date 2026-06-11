import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "./Mau.module.css";
import image1 from "../../assets/maupic1.jpg";
import image2 from "../../assets/maupic2.jpg";

function Mau({ darkMode }) {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "+=1500",
          scrub: true,
          // pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      tl.to(
        leftImageRef.current,
        {
          x: -580,
          rotation: -10,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        rightImageRef.current,
        {
          x: 580,
          rotation: 10,
          ease: "power2.out",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP context
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.imageWrapper}>
        <img
          ref={leftImageRef}
          src={image1}
          alt="Image1"
          className={`${styles.image1} ${styles.leftImage}`}
        />
        <img
          ref={rightImageRef}
          src={image2}
          alt="Image2"
          className={`${styles.image2} ${styles.rightImage}`}
        />
      </div>

      <div ref={textRef} className={styles.date}>
        <p>
          FEBRUARY 2025 &nbsp;&nbsp;&nbsp;
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 4L0 8V0L16 4Z" fill="currentColor"></path>
          </svg>
          &nbsp;&nbsp;&nbsp; Village Photography"
        </p>
        <br />
        <h1 className={styles.place}>
          Visit
          <br />
          My HomeTown
        </h1>
        <button className={styles.button}>SEE CASE STUDY</button>
      </div>
    </div>
  );
}

export default Mau;
