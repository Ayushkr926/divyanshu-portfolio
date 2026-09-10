import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageStrip.module.css";

import image1 from "../../../assets/first.jpg";
import image2 from "../../../assets/second.jpg";
import image3 from "../../../assets/third.jpg";
import image4 from "../../../assets/fourth.jpg";
import image5 from "../../../assets/fifth.jpg";
import image6 from "../../../assets/sixth.jpg";
import image7 from "../../../assets/seventh.jpg";
import image8 from "../../../assets/eigth.jpg";
import image9 from "../../../assets/ninth.jpg";
import image10 from "../../../assets/tenth.jpg";
import image11 from "../../../assets/eleventh.jpg";
import image12 from "../../../assets/twelve.jpg";

gsap.registerPlugin(ScrollTrigger);

function ImageStrip() {
  const stripRef = useRef(null);
  const wrapperRef = useRef(null);
  const imagesRef = useRef([]);
  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ]);

  // Shuffle function (Fisher-Yates)
  const shuffleImages = () => {
    setImages((prevImages) => {
      const shuffled = [...prevImages];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const strip = stripRef.current;
      const wrapper = wrapperRef.current;

      if (!strip) return;

      // ===== ENTRANCE ANIMATION =====
      gsap.timeline()
        .from(wrapper, {
          opacity: 0,
          y: 40,
          // filter: "blur(10px)",
          duration: 1.2,
          ease: "power2.out",
        })
        .from(imagesRef.current, {
          opacity: 0,
          scale: 0.8,
          // filter: "blur(5px)",
          stagger: 0.05,
          duration: 0.8,
          ease: "cubic.out",
        }, 0.3);

      // ===== PRIMARY SCROLL ANIMATION (Horizontal Movement) =====
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.to(strip, {
        x: "-15%",
        ease: "none",
        duration: 1,
      });

      // ===== SECONDARY SCROLL ANIMATION (Image Effects) =====
      const imageScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      imagesRef.current.forEach((img, index) => {
        imageScrollTl.to(
          img,
          {
            // filter: `brightness(0.9) contrast(1.1)`,
            scale: 1.02,
            duration: 1,
            ease: "none",
          },
          0
        );
      });

      // ===== ROTATION ANIMATION (Subtle) =====
      gsap.to(wrapper, {
        rotation: -5,
        duration: 0.1,
        ease: "none",
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, wrapperRef);

    // Shuffle every 10 seconds
    const interval = setInterval(shuffleImages, 10000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stripRef} className={styles.strip}>
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className={styles.imageFrame}>
            <img
              ref={(el) => (imagesRef.current[index] = el)}
              src={src}
              alt={`img${index}`}
              loading="lazy"
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStrip;