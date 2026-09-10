import { useLayoutEffect, useRef } from "react";
import styles from "./header.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Header({ darkMode }) {
  const profileRef = useRef(null);
  const paraRef = useRef(null);
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const topRef = useRef(null);
  const taglineRef = useRef(null);
  const charSpansRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const profile = profileRef.current;
      const container = containerRef.current;
      const para = paraRef.current;

      if (!para || !profile) return;

      // ===== Split paragraph into character spans =====
      const text = para.innerText;
      para.innerHTML = "";
      charSpansRef.current = [];

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(24px)";
        span.style.display = "inline-block";
        para.appendChild(span);
        charSpansRef.current.push(span);
      });

      // ===== Entrance Timeline =====
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl
        .from(topRef.current, {
          opacity: 0,
          y: -40,
          duration: 1.1,
        })
        .from(
          nameRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.1,
          },
          "-=0.85"
        )
        .from(
          taglineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          profile,
          {
            opacity: 0,
            scale: 0.82,
            // filter: "blur(12px)",
            duration: 1.4,
          },
          "-=1.1"
        )
        .to(
          charSpansRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.012,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.6"
        );

      // ===== Primary Scroll: Pin + Profile movement =====
      const profileScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=700",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      profileScrollTl
        .to(
          profile,
          {
            y: -180,
            scale: 1.18,
            // filter: "brightness(1.08)",
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          topRef.current,
          {
            y: -40,
            scale: 0.92,
            duration: 1,
            ease: "none",
          },
          0
        );

      // ===== Secondary Scroll: Text + subtle profile shift =====
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "25% center",
          end: "bottom bottom",
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      })
        .to(paraRef.current, {
          letterSpacing: "0.04em",
          ease: "none",
          duration: 1.4,
        })
        .to(
          profile,
          {
            // filter: "brightness(0.92) contrast(1.08)",
            ease: "none",
            duration: 1.4,
          },
          0
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      {/* Top identity */}
      <div className={styles.identity}>
        
        <h1 ref={nameRef} className={styles.creates}>
          Divyanshu <em>Creates</em>
        </h1>
        <p ref={taglineRef} className={styles.tagline}>
          Visual storyteller <span>·</span> Filmmaker
        </p>
      </div>

      {/* Profile focal point */}
      <div className={styles.profileWrapper}>
        <div ref={profileRef} className={styles.profile} />
      </div>

      {/* Bio */}
      <div className={styles.bio}>
        <div className={styles.bioLabel}>A note from behind the lens</div>
        <p ref={paraRef} className={styles.paragraph}>
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

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll to explore</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default Header;