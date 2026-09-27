import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./header.module.css";

const descriptionLines = [
  "Photography immortalizes fleeting moments, etching them into our memories.",
  "Each photo captures our unique vision of the world, shaping who we are.",
  "These experiences are irreplaceable, forever treasured.",
];

function Header_stiils({ darkMode }) {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRefs = useRef([]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(titleRef.current, {
            autoAlpha: 0,
            y: 34,
            filter: "blur(12px)",
            duration: 1.15,
          })
          .from(
            lineRefs.current,
            {
              autoAlpha: 0,
              y: 16,
              filter: "blur(7px)",
              duration: 0.55,
              stagger: 0.13,
            },
            "-=0.25"
          );
      });
      return () => media.revert();
    }, headerRef);

    return () => context.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.still}>
        <h1 ref={titleRef} className={styles.title}>Stills</h1>
        <p className={styles.description}>
          {descriptionLines.map((line, index) => (
            <span
              key={line}
              ref={(element) => { lineRefs.current[index] = element; }}
              className={styles.descriptionLine}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </header>
  );
}

export default Header_stiils;
