import { useEffect, useRef } from "react";
import styles from "./header.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Header({ darkMode }) {
  const profileRef = useRef(null);
  const paraRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const profile = profileRef.current;
    const container = containerRef.current;
    const para = paraRef.current;

    // Wait for DOM to mount
    if (!para) return;

    // Split paragraph into spans
    const text = para.innerText;
    para.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = 0;
      para.appendChild(span);
    });

    const chars = para.querySelectorAll("span");

    // Timeline for profile image scroll animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=500",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTl.to(profile, {
      y: -220,
      scale: 1.25,
      ease: "power1.inOut",
      duration: 2,
    });

    // Animate paragraph only after profile animation finishes
    const paraTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "center center", // or "70% top"
        end: "bottom bottom",
        scrub: 1,
      },
    });

    paraTl.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: "linear",
      duration: 2.6,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <h1 className={styles.top}>Divyanshu</h1>

      <div className={styles.name}>
        <h1>Creates</h1>
      </div>

      <div ref={profileRef} className={styles.profile}></div>

      <div className={styles.paragraph}>
        <p ref={paraRef}>
          I grew up in a small village in Uttar Pradesh, where simple sights
          inspired a deep creative urge. Filmmaking became my way of showing the
          world what I see through my own eyes — raw, real, and honest. What
          started as video-making slowly turned into visual storytelling, where
          every frame I shoot speaks of emotion, culture, and life. My dream is
          to travel across India — explore its rich diversity, document raw
          experiences, and one day, even reach Antarctica. Through my lens, I
          aim to remind people that life is to be felt, lived, and shared.....
        </p>
      </div>
    </div>
  );
}

export default Header;
