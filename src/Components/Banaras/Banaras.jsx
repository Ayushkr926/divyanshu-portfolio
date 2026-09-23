import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Banaras.module.css";
import image1 from "../../assets/varanasi.jpg";
import image2 from "../../assets/varanasi2.jpg";

gsap.registerPlugin(ScrollTrigger);

function Banaras({ darkMode }) {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const textRef = useRef(null);
  const dateRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const images = [leftImageRef.current, rightImageRef.current];
        const distance = () => Math.min(window.innerWidth * 0.52, 640);
        gsap.set(images, { transformOrigin: "center", force3D: true });
        gsap.set(textRef.current, { autoAlpha: 0, y: 28 });

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=125%",
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(leftImageRef.current, { x: () => -distance(), rotation: -6, scale: 1.02, ease: "none" }, 0)
          .to(rightImageRef.current, { x: distance, rotation: 6, scale: 1.02, ease: "none" }, 0)
          .to(textRef.current, { autoAlpha: 1, y: 0, ease: "none" }, 0.32);

        const button = buttonRef.current;
        const enter = () => gsap.to(button, { y: -3, scale: 1.035, duration: 0.28, ease: "power2.out", overwrite: "auto" });
        const leave = () => gsap.to(button, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);
        return () => { button.removeEventListener("mouseenter", enter); button.removeEventListener("mouseleave", leave); };
      });
      return () => media.revert();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return <section ref={containerRef} className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
    <div className={styles.imageWrapper} aria-hidden="true">
      <img ref={leftImageRef} src={image1} loading="lazy" alt="" className={`${styles.image1} ${styles.leftImage}`} />
      <img ref={rightImageRef} src={image2} loading="lazy" alt="" className={`${styles.image2} ${styles.rightImage}`} />
    </div>
    <div ref={textRef} className={styles.date}>
      <p ref={dateRef} className={styles.dateText}>JUNE 2025 &nbsp;&nbsp;&nbsp;<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 4L0 8V0L16 4Z" fill="currentColor" /></svg>&nbsp;&nbsp;&nbsp; Kashi | Banaras | Varanasi</p>
      <h1 ref={headingRef} className={styles.place}>Visit<br />Varanasi</h1>
      <button ref={buttonRef} className={styles.button}>SEE CASE STUDY</button>
    </div>
  </section>;
}

export default Banaras;
