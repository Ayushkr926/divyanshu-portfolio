import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MotionProject.module.css";

gsap.registerPlugin(ScrollTrigger);

function MotionProject({ project, darkMode }) {
  const sectionRef = useRef(null);
  const collageRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const depths = [46, 10, 32, 20];
        gsap.set(cards, { transformPerspective: 1200, transformOrigin: "center center", force3D: true });
        cards.forEach((card, index) => {
          gsap.set(card, { z: depths[index] });
          gsap.set(card.querySelector("img"), { z: 24, scale: 1.1, force3D: true });
        });

        gsap.from(cards, {
          y: 36,
          scale: 0.94,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        const onMove = (event) => {
          const bounds = collageRef.current.getBoundingClientRect();
          const pointerX = (event.clientX - bounds.left) / bounds.width;
          const pointerY = (event.clientY - bounds.top) / bounds.height;
          const x = (pointerX - 0.5) * 2;
          const y = (pointerY - 0.5) * 2;

          cards.forEach((card, index) => {
            const intensity = index === 0 ? 1 : 1.45;
            gsap.to(card, {
              x: x * 13 * intensity,
              y: y * 10 * intensity,
              rotateY: x * 8 * intensity,
              rotateX: -y * 8 * intensity,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(card.querySelector("img"), { x: x * -10 * intensity, y: y * -8 * intensity, duration: 0.55, ease: "power2.out", overwrite: "auto" });
            card.style.setProperty("--shine-x", `${pointerX * 100}%`);
            card.style.setProperty("--shine-y", `${pointerY * 100}%`);
          });
        };

        const onLeave = () => {
          cards.forEach((card) =>
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            })
          );
          cards.forEach((card) => gsap.to(card.querySelector("img"), { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" }));
        };

        const section = collageRef.current;

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);

        return () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.project} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.heading}>
        <p className={styles.meta}>
          <span className={styles.date}>{project.date}</span>

          <span className={styles.metaIcon} aria-hidden="true">
            ▶
          </span>

          <span className={styles.label}>{project.label}</span>
        </p>

        <h2 className={styles.title}>
          {project.title}
        </h2>
      </div>

      <div ref={collageRef} className={styles.collage}>
        {project.images.map((image, index) => (
          <div
            key={image}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={`${styles.imageCard} ${
              styles[`card${index}`]
            }`}
          >
            <img
              className={styles.image}
              src={image}
              alt=""
              loading="lazy"
            />

            <span className={styles.shine} aria-hidden="true" />

            {index === 0 && (
              <Link
                className={styles.play}
                to={`/motion/${project.slug}`}
                aria-label={`Open ${project.title} case study`}
              >
                ▶
              </Link>
            )}
          </div>
        ))}
      </div>

      <Link
        className={styles.button}
        to={`/motion/${project.slug}`}
      >
        SEE CASE STUDY
      </Link>
    </section>
  );
}

export default MotionProject;
