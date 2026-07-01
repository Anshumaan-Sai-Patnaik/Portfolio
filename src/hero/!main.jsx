import { useEffect, useRef } from "react";
import "./!main.css";

const TITLE_WORDS = ["ANSHUMAAN", "SAI", "PATNAIK"];

function Hero() {
  const innerRef = useRef(null);
  const cueRef = useRef(null);

  // Scroll-linked exit: the sticky title drifts up and fades as the next
  // section slides over it; the scroll cue disappears almost immediately.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = null;

    const update = () => {
      frame = null;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      const inner = innerRef.current;
      if (inner) {
        inner.style.opacity = String(1 - p);
        inner.style.transform = `translateY(${(-56 * p).toFixed(2)}px) scale(${(1 - 0.035 * p).toFixed(4)})`;
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
      }
    };
    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__inner" ref={innerRef}>
        <h1 className="hero__title">
          {TITLE_WORDS.map((word, i) => (
            <span className="hero__word" key={word}>
              <span
                className="hero__word-inner"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__desc">
          Full-Stack Web Developer crafting scalable, high-performance web applications with intuitive user experiences and reliable backend architecture.
        </p>
      </div>

      {/* Outer div takes the scroll-fade (inline style); the inner one owns the
          entrance animation, so the two opacities never fight. */}
      <div className="hero__cue" ref={cueRef} aria-hidden="true">
        <div className="hero__cue-in">
          <span className="hero__cue-label">Scroll</span>
          <span className="hero__cue-line" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
