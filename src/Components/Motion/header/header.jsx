import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./header.module.css";

function MotionHeader({ darkMode }) {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRefs = useRef([]);
  const descriptionLines = [
    "To me, filmmaking is about capturing emotion in motion.",
    "It is not just editing clips together; it is a complete world",
    "built frame by frame. Every single frame should carry meaning",
    "and tell a piece of the story on its own. That is what visual",
    "storytelling means to me. When someone watches something I",
    "have directed, I want them to feel it was worth watching.",
    "More than that, I want them to lose themselves in the story.",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(titleRef.current, { autoAlpha: 0, y: 34, filter: "blur(12px)", duration: 1.15 })
          .from(lineRefs.current, { autoAlpha: 0, y: 16, filter: "blur(7px)", duration: 0.55, stagger: 0.13 }, "-=0.25");
      });
      return () => media.revert();
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.motionHeader} ${darkMode ? styles.dark : styles.light}`}
    >
      <h1 ref={titleRef} className={styles.title}>Motion</h1>
      <p className={styles.description}>
        {descriptionLines.map((line, index) => (
          <span key={line} ref={(element) => { lineRefs.current[index] = element; }} className={styles.descriptionLine}>{line}</span>
        ))}
      </p>
    </header>
  );
}

export default MotionHeader;
