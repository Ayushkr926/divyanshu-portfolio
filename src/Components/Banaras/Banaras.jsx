import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "./Banaras.module.css";
import image1 from "../../assets/varanasi.jpg";
import image2 from "../../assets/varanasi2.jpg";

function Banaras({ darkMode }) {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const dateRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Calculate distance based on screen size
        const distance = Math.min(window.innerWidth * 0.5, 500);
        
        // ===== ENTRANCE ANIMATION =====
        gsap.timeline()
          .from(leftImageRef.current, {
            x: -300,
            opacity: 0,
            rotation: -15,
            duration: 1,
            ease: "power2.out"
          }, 0)
          .from(rightImageRef.current, {
            x: 100,
            opacity: 0,
            rotation: 15,
            duration: 1,
            ease: "power2.out"
          }, 0)
          .from(dateRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          }, 0.3)
          .from(headingRef.current, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
          }, 0.5)
          .from(buttonRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
          }, 0.7);

        // ===== SCROLL PARALLAX ANIMATION =====
        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.3, // Smooth scrubbing with 1.5s lag
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            markers: false, // Set to true for debugging
          },
        });

        // Left image moves left, rotates counter-clockwise, scales slightly
        scrollTL.to(
          leftImageRef.current,
          {
            x: -distance,
            rotation: -10,
            scale: 1.05,
            filter: "brightness(0.95)",
            duration: 0.3,
            ease: "none"
          },
          0
        );

        // Right image moves right, rotates clockwise, scales slightly
        scrollTL.to(
          rightImageRef.current,
          {
            x: distance,
            rotation: 10,
            scale: 1.05,
            filter: "brightness(0.95)",
            duration: 0.3,
            ease: "none"
          },
          0
        );

        // Center content animates - subtle floating effect
        scrollTL.to(
          textRef.current,
          {
            y: -40,
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
          },
          0
        );

        // ===== SECONDARY SCROLL ANIMATION (Staggered) =====
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 10%",
            scrub: 2,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
          },
        })
          .to(
            dateRef.current,
            {
              letterSpacing: "0.15em",
              opacity: 0.7,
              duration: 1,
              ease: "none"
            },
            0
          )
          .to(
            headingRef.current,
            {
              scale: 1.1,
              duration: 1,
              ease: "none"
            },
            0
          );

        return () => media.revert();
      });

      return () => ctx.revert();
    }, containerRef);

    return () => ctx.revert();
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
          loading="lazy"
          alt="Image1"
          className={`${styles.image1} ${styles.leftImage}`}
        />
        <img
          ref={rightImageRef}
          src={image2}
          loading="lazy"
          alt="Image2"
          className={`${styles.image2} ${styles.rightImage}`}
        />
      </div>

      <div ref={textRef} className={styles.date}>
        <p ref={dateRef}>
          JUNE 2025 &nbsp;&nbsp;&nbsp;
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 4L0 8V0L16 4Z" fill="currentColor"></path>
          </svg>
          &nbsp;&nbsp;&nbsp; Kashi | Banaras | Varanasi
        </p>
        <br />
        <h1 ref={headingRef} className={styles.place}>
          Visit
          <br />
          Varanasi
        </h1>
        <button ref={buttonRef} className={styles.button}>SEE CASE STUDY</button>
      </div>
    </div>
  );
}

export default Banaras;
