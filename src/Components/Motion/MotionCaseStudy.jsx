import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionProjects } from "./projects";
import styles from "./MotionCaseStudy.module.css";

gsap.registerPlugin(ScrollTrigger);

function AnimatedParagraph({ text, className }) {
  const paragraphRef = useRef(null);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;

    if (!paragraph || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const linesByTop = new Map();
    paragraph.querySelectorAll(`.${styles.descriptionWord}`).forEach((word) => {
      const lineTop = Math.round(word.getBoundingClientRect().top);
      const line = linesByTop.get(lineTop) ?? [];
      line.push(word);
      linesByTop.set(lineTop, line);
    });

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: paragraph,
          start: "top 88%",
          once: true,
        },
      });

      [...linesByTop.values()].forEach((line, lineIndex) => {
        timeline.fromTo(
          line,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.01,
            ease: "power3.out",
          },
          lineIndex * 0.1
        );
      });
    }, paragraph);

    return () => context.revert();
  }, [text]);

  return (
    <p ref={paragraphRef} className={className}>
      {text.split(/(\s+)/).map((part, index) =>
        part.trim() ? (
          <span key={index} className={styles.descriptionWord}>{part}</span>
        ) : part
      )}
    </p>
  );
}

function MotionCaseStudy() {
  const { slug } = useParams();
  const project = motionProjects.find((item) => item.slug === slug);
  const exploreProjects = motionProjects.filter((item) => item.slug !== slug);
  const exploreProjectCount = exploreProjects.length;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const behindSceneRef = useRef(null);
  const exploreGridRef = useRef(null);

  const startVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setHasStartedVideo(true);
    } catch {
      setIsVideoPlaying(false);
    }
  };

  const toggleVideo = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await startVideo();
    } else {
      videoRef.current.pause();
    }
  };

  useLayoutEffect(() => {
    if (
      !project ||
      !galleryRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (project.video && videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.2, ease: "power2.out" }
        );
      }

      const tracks = gsap.utils.toArray(`.${styles.galleryTrack}`);

      tracks.forEach((track, rowIndex) => {
        const movesRight = rowIndex === 1;

        gsap.fromTo(
          track,
          { xPercent: movesRight ? -12 : 0 },
          {
            xPercent: movesRight ? 0 : -12,
            ease: "easeout",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      });
    }, galleryRef);

    return () => context.revert();
  }, [project]);

  useEffect(() => {
    const container = exploreGridRef.current;

    if (!container || !exploreProjectCount) {
      return undefined;
    }

    const getSetWidth = () => {
      const lastCard = container.children[exploreProjectCount - 1];
      return lastCard ? lastCard.offsetLeft + lastCard.offsetWidth : 0;
    };

    container.scrollLeft = getSetWidth();

    let scrollEndTimer;
    const handleScroll = () => {
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        const setWidth = getSetWidth();

        if (setWidth && container.scrollLeft < 1) {
          container.scrollLeft += setWidth;
        } else if (
          setWidth &&
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
        ) {
          container.scrollLeft -= setWidth;
        }
      }, 140);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(scrollEndTimer);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [exploreProjectCount]);

  const moveExplore = (direction) => {
    const container = exploreGridRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * container.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const section = behindSceneRef.current;

    if (
      !project ||
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      const frames = gsap.utils.toArray(`.${styles.behindSceneFrame}`);
      const behindWord = section.querySelector(`.${styles.behindWord}`);
      const sceneWord = section.querySelector(`.${styles.sceneWord}`);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * Math.max(1, frames.length - 1)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const stage = section.querySelector(`.${styles.behindSceneStage}`);

      gsap.set(frames, {
        autoAlpha: 0,
        yPercent: 110,
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(frames.slice(1), { clipPath: "inset(0 0 100% 0)" });
      gsap.set(stage, { autoAlpha: 0, height: 0, scaleY: 0.46 });
      gsap.set([behindWord, sceneWord], { autoAlpha: 1, yPercent: 0 });

      timeline
        .to(stage, { height: "min(58svh, 40rem)", autoAlpha: 1, scaleY: 1, duration: 1.6, ease: "power2.out" }, 0)
        .to(behindWord, { yPercent: -370,autoAlpha: 1, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to(sceneWord, { yPercent: 340, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to(frames[0], { yPercent: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power2.out" }, 0.15);

      frames.slice(1).forEach((frame, index) => {
        const transitionAt = 1.3 + index * 1.05;

        timeline
          .to(
            frames[index],
            { yPercent: -180, autoAlpha: 1, clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "power2.inOut" },
            transitionAt
          )
          .to(
            frame,
            { yPercent: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power2.out" },
            transitionAt
          );
      });
    }, section);

    return () => context.revert();
  }, [project]);

  if (!project) {
    return (
      <main className={`${styles.caseStudy} ${styles.notFound}`}>
        <Link className={styles.back} to="/motion">
          Back to Motion
        </Link>
        <h1 className={styles.notFoundTitle}>Case study not found.</h1>
      </main>
    );
  }

  const galleryImages = project.images;
  const galleryRows = [0, 1].map((rowIndex) => {
    const rowImages = galleryImages
      .map((src, imageIndex) => ({ src, imageIndex }))
      .filter((_, imageIndex) => imageIndex % 2 === rowIndex);

    return Array.from(
      { length: Math.max(12, rowImages.length) },
      (_, imageIndex) => rowImages[imageIndex % rowImages.length]
    );
  });

  return (
    <main className={styles.caseStudy}>
      <section className={styles.heroShell}>
        <section className={`${styles.hero} ${isVideoPlaying ? styles.heroPlaying : ""}`}>
          {project.video ? (
            <video
              ref={videoRef}
              className={styles.projectImage}
              src={project.video}
              poster={project.images[0]}
              
              loop
              playsInline
              onPlay={() => {
                setIsVideoPlaying(true);
                setHasStartedVideo(true);
              }}
              onPause={() => setIsVideoPlaying(false)}
              aria-label={`${project.title} showreel`}
            />
          ) : (
            <div className={styles.heroImageButton}>
              <img className={styles.projectImage} src={project.images[0]} alt={project.title} />
            </div>
          )}

          {!isVideoPlaying && (
            <div className={styles.heroContent}>
              <h1 className={styles.title}>{project.title}</h1>
              {project.video && (
                <button type="button" className={styles.watchButton} onClick={startVideo}>
                  <span>WATCH VIDEO</span>
                  <span className={styles.playIcon} aria-hidden="true">
                    ▶
                  </span>
                </button>
              )}
            </div>
          )}

          {project.video && hasStartedVideo && (
            <div className={styles.videoControls}>
              <button
                type="button"
                className={styles.videoControlButton}
                onClick={toggleVideo}
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                <span className={styles.videoIcon}>
                  {isVideoPlaying ? "❚❚" : "▶"}
                </span>
              </button>
            </div>
          )}
        </section>
      </section>

      <section className={styles.projectInfo}>
        <div className={styles.details}>
          <div>
            <span>DATE</span>
            <strong>{project.date}</strong>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>LOCATION</span>
            <strong>{project.label}</strong>
          </div>
        </div>
        {project.description && (
          <AnimatedParagraph
            className={styles.description}
            text={project.description}
          />
        )}
        {project.breakdescription && (
          <AnimatedParagraph
            className={styles.breakDescription}
            text={project.breakdescription}
          />
        )}
      </section>

      <section
        ref={galleryRef}
        className={styles.gallery}
        aria-label={`${project.title} gallery`}
      >
        {galleryRows.map((rowImages, rowIndex) => (
          <div
            key={rowIndex}
            className={styles.galleryRow}
            aria-label={`Photo row ${rowIndex + 1}`}
          >
            <div className={styles.galleryTrack}>
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className={styles.galleryGroup}
                  aria-hidden={copyIndex === 1 ? "true" : undefined}
                >
                  {rowImages.map(({ src, imageIndex }, itemIndex) => (
                    <div
                      key={`${imageIndex}-${itemIndex}`}
                      className={styles.galleryCard}
                    >
                      <div className={styles.imageButton}>
                        <div
                          className={styles.galleryImage}
                          style={{ "--image-source": `url(${JSON.stringify(src)})` }}
                        >
                          <img
                            className={styles.galleryForeground}
                            src={src}
                            alt={`${project.title} photograph ${imageIndex + 1}`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.credit}>
        <span>DIRECTOR</span>
        <strong>DIVYANSHU RAI</strong>
        <i aria-hidden="true" />
      </section>

      <section
        ref={behindSceneRef}
        className={styles.behindScene}
        aria-label="Behind the Scene"
      >
        <h2 className={styles.behindSceneHeading}>
          <span className={styles.behindWord}>Behind</span>
          <span className={styles.sceneWord}> the scenes</span>
        </h2>
        <div className={styles.behindSceneStage}>
          {project.images.map((src, imageIndex) => (
            <figure
              key={`${src}-${imageIndex}`}
              className={styles.behindSceneFrame}
            >
              <img
                className={styles.behindSceneImage}
                src={src}
                alt={`${project.title} behind-the-scenes image ${imageIndex + 1}`}
                loading={imageIndex === 0 ? "eager" : "lazy"}
              />
              <figcaption className={styles.behindSceneCount}>
                {String(imageIndex + 1).padStart(2, "0")}
                <span> / {String(project.images.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.exploreMore} aria-label="Explore more projects">
        <p className={styles.exploreLabel}>EXPLORE MORE</p>

        <div className={styles.exploreCarousel}>
          <button
            type="button"
            className={styles.exploreArrow}
            onClick={() => moveExplore(-1)}
            aria-label="Show previous projects"
            title="Previous projects"
          >
            <span className={styles.arrowLeft} aria-hidden="true" />
          </button>
          <div ref={exploreGridRef} className={styles.exploreGrid}>
            {[...exploreProjects, ...exploreProjects, ...exploreProjects].map((item, index) => (
              <article key={`${item.slug}-${index}`} className={styles.exploreCard}>
                <img
                  className={styles.exploreImage}
                  src={item.images[0]}
                  alt={item.title}
                  loading="lazy"
                />

                <div className={styles.exploreOverlay} />

                <div className={styles.exploreContent}>
                  <span className={styles.exploreMeta}>{item.label}</span>
                  <h3 className={styles.exploreTitle}>{item.title}</h3>
                  <Link className={styles.exploreButton} to={`/motion/${item.slug}`}>
                    SEE CASE STUDY
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            className={styles.exploreArrow}
            onClick={() => moveExplore(1)}
            aria-label="Show next projects"
            title="Next projects"
          >
            <span className={styles.arrowRight} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default MotionCaseStudy;