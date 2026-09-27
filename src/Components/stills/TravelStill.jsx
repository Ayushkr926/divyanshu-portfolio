import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TravelStill.module.css";

gsap.registerPlugin(ScrollTrigger);

function TravelStill({ project, darkMode }) {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const dateRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.min(window.innerWidth * 0.52, 640);
        const images = [leftImageRef.current, rightImageRef.current];

        gsap.set(images, { transformOrigin: "center", force3D: true });

        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
        })
          .from(titleRef.current, {
            autoAlpha: 0,
            y: 34,
            filter: "blur(12px)",
            duration: 1.15,
          })
          .from(
            [dateRef.current, buttonRef.current],
            {
              autoAlpha: 0,
              y: 16,
              filter: "blur(7px)",
              duration: 0.55,
              stagger: 0.13,
            },
            "-=0.25"
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=125%",
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
          },
        })
          .to(leftImageRef.current, { x: () => -distance(), rotation: -6, scale: 1.02, ease: "none" }, 0)
          .to(rightImageRef.current, { x: distance, rotation: 6, scale: 1.02, ease: "none" }, 0);

        const button = buttonRef.current;
        const enter = () => gsap.to(button, { y: -3, scale: 1.035, duration: 0.28, ease: "power2.out", overwrite: "auto" });
        const leave = () => gsap.to(button, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);
        return () => {
          button.removeEventListener("mouseenter", enter);
          button.removeEventListener("mouseleave", leave);
        };
      });

      return () => media.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={containerRef}
      to={`/motion/${project.slug}`}
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
      aria-label={`Open ${project.title} motion case study`}
    >
      <div className={styles.imageWrapper} aria-hidden="true">
        <img ref={leftImageRef} src={project.images[0]} loading="lazy" alt="" className={`${styles.image} ${styles.leftImage}`} />
        <img ref={rightImageRef} src={project.images[1]} loading="lazy" alt="" className={`${styles.image} ${styles.rightImage}`} />
      </div>
      <div ref={textRef} className={styles.date}>
        <p ref={dateRef} className={styles.dateText}>
          {project.date}
          <span className={styles.arrow} aria-hidden="true">▶</span>
          {project.label}
        </p>
        <h1 ref={titleRef} className={styles.place}>Visit<br />{project.title}</h1>
        <span ref={buttonRef} className={styles.button}>
          SEE CASE STUDY
        </span>
      </div>
    </Link>
  );
}

export default TravelStill;
