import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageStrip.module.css";

import image1 from "../../../../assets/first.jpg";
import image2 from "../../../../assets/second.jpg";
import image3 from "../../../../assets/third.jpg";
import image4 from "../../../../assets/fourth.jpg";
import image5 from "../../../../assets/fifth.jpg";
import image6 from "../../../../assets/sixth.jpg";
import image7 from "../../../../assets/seventh.jpg";
import image8 from "../../../../assets/eigth.jpg";
import image9 from "../../../../assets/ninth.jpg";
import image10 from "../../../../assets/tenth.jpg";
import image11 from "../../../../assets/eleventh.jpg";
import image12 from "../../../../assets/twelve.jpg";

gsap.registerPlugin(ScrollTrigger);

function ImageStrip() {
  const stripRef = useRef(null);
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

  useEffect(() => {
    const strip = stripRef.current;

    // Initial Fade-in
    gsap.from(strip, {
      // autoAlpha: 0,
      y: 0,
      duration: 5.5,
      ease: "linear",
    });

    // Scroll-driven horizontal movement
    gsap.to(strip, {
      x: "-10%",
      ease: "none", // Use "none" for pure scrubbed scroll
      scrollTrigger: {
        trigger: strip,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Reduce to 1 for less lag; 2 is more resistant
        // markers: true, // Uncomment for debugging
      },
    });

    // Shuffle every 10 seconds
    const interval = setInterval(shuffleImages, 10000);

    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={stripRef} className={styles.strip}>
        {images.map((src, index) => (
          <img key={`${src}-${index}`} src={src} alt={`img${index}`} />
        ))}
      </div>
    </div>
  );
}

export default ImageStrip;
