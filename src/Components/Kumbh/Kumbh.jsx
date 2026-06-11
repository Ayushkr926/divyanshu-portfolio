import { useEffect, useRef } from "react";
import styles from "./Kumbh.module.css";
import mainimage from "../../assets/mahakumbh.jpg";
import baba from "../../assets/baba.png";
import imagepray from "../../assets/imagepray.png";
import bajrangbali from "../../assets/bajrangbali.jpg";
import gsap from "gsap";

function Kumbh({ darkMode }) {
  const imageContainerRef = useRef(null);
  const mainRef = useRef(null);
  const leftRef = useRef(null);
  const downRef = useRef(null);
  const rightRef = useRef(null);
  const maruti = useRef(null);

  useEffect(() => {
    const container = imageContainerRef.current;

    // Initial zoom-in animation
    gsap.from([mainRef.current, leftRef.current, downRef.current], {
      scale: 0.8,
      y: 20,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2,
    });

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // tilt range
      const y = (e.clientY / innerHeight - 0.5) * 20;

      // Animate each image with a slight difference for parallax
      gsap.to(mainRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(leftRef.current, {
        rotateY: x * 1.2,
        rotateX: -y * 1.2,
        duration: 0.8,
        ease: "power1.out",
      });
      gsap.to(downRef.current, {
        rotateY: x * 1.2,
        rotateX: -y * 1.2,
        duration: 0.8,
        ease: "power1.out",
      });

      gsap.to(rightRef.current, {
        rotateY: x * 1.2,
        rotateX: -y * 1.2,
        duration: 0.8,
        ease: "power1.out",
      });

      gsap.to(maruti.current, {
        rotateY: x * 1.2,
        rotateX: -y * 1.2,
        duration: 0.8,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.date}>
        <div className={styles.time}>
          <p>
            JANUARY 2025 &nbsp;&nbsp;&nbsp;
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M16 4L0 8V0L16 4Z" fill="currentColor" />
            </svg>{" "}
            MAHA KUMBH
          </p>
        </div>
        <div className={styles.place}>
          <h1>MAHA KUMBH</h1>
        </div>
      </div>

      <div className={styles.images} ref={imageContainerRef}>
        <div className={styles.mainimage} ref={mainRef}>
          <img src={mainimage} alt="main kumbh" />
          <div className={styles.circle}>
            <div className={styles.play}>
              <svg
                width="10%"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.leftimage} ref={leftRef}>
          <img src={imagepray} alt="pray" />
        </div>
        <div className={styles.downimage} ref={downRef}>
          <img src={baba} alt="baba" />
        </div>
        <div ref={rightRef} className={styles.rightimage}>
          <img ref={maruti} src={bajrangbali} alt="bajrangbali" />
        </div>
      </div>
      <button className={styles.button}>SEE CASE STUDY</button>
    </div>
  );
}

export default Kumbh;
