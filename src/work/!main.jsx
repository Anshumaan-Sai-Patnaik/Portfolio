import "./!main.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { works } from "./data";

const TABS = [
  {
    id: "all",
    label: "All Works",
    heading: "Everything I've built so far",
    text: "The whole run, newest to oldest — nothing cherry-picked. Pick any one to read the story, see it up close, and dig into the technical report.",
  },
  {
    id: "chosen",
    label: "Chosen Works",
    heading: "A few I'm most proud of",
    text: "A handful I'd put forward first, still laid out newest to oldest. Pick any one to read the story, see it up close, and dig into the technical report.",
  },
];

// Path to a project's first image (entries may be "01.png" or { src, caption }).
function firstImageSrc(work) {
  const img = work.images?.[0];
  if (!img) return null;
  const src = typeof img === "string" ? img : img.src;
  return `/works/${work.id}/${src}`;
}

function Work() {
  const [tab, setTab] = useState("all");
  // `src` is kept after the cursor leaves so the image can fade out gracefully.
  const [preview, setPreview] = useState({ src: null, on: false });
  const previewRef = useRef(null);
  const timelineRef = useRef(null);

  const active = TABS.find((t) => t.id === tab);
  const visible = tab === "chosen" ? works.filter((w) => w.featured) : works;

  const showPreview = (work) => {
    // In-progress projects have no finished shot — clear any previous preview.
    const src = work.inProgress ? null : firstImageSrc(work);
    setPreview((p) => (src ? { src, on: true } : { ...p, on: false }));
  };
  const hidePreview = () => setPreview((p) => ({ ...p, on: false }));

  // Float the preview alongside the cursor with a soft, eased trail.
  // Pointer-only — skipped entirely on touch / coarse-pointer devices.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame;

    const render = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      const el = previewRef.current;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The global reveal observer (in Home) only runs on mount, so items that
  // remount when the tab changes would stay hidden. Re-observe this section's
  // items whenever the visible set changes.
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tab]);

  return (
    <section id="work" className="works">
      <p className="works__label" data-reveal>Work</p>

      <div className="works__tabs" data-reveal style={{ '--reveal-delay': '0.04s' }} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`works__tab${tab === t.id ? " works__tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <h2 className="works__statement" data-reveal style={{ '--reveal-delay': '0.08s' }}>
        {active.heading}
      </h2>

      <p className="works__text" data-reveal style={{ '--reveal-delay': '0.16s' }}>
        {active.text}
      </p>

      <ol className="works__timeline" ref={timelineRef} onMouseLeave={hidePreview}>
        {visible.map((work, i) => (
          <li
            key={work.id}
            className="works__item"
            data-reveal
            style={{ '--reveal-delay': `${0.05 * i}s` }}
          >
            <Link
              to={`/works/${work.id}`}
              className="works__entry"
              aria-label={`Open ${work.title}`}
              onMouseEnter={() => showPreview(work)}
            >
              <span className="works__index" aria-hidden="true">
                {String(visible.length - i).padStart(2, "0")}
              </span>

              <span className="works__year">{work.year}</span>

              <span className="works__body">
                <span className="works__category">{work.category}</span>
                <span className="works__title">{work.title}</span>
                <span className="works__blurb">{work.blurb}</span>
                <span className="works__more">
                  Know more
                  <span className="works__more-arrow" aria-hidden="true">
                    <svg width="13" height="11" viewBox="0 0 15 13" fill="none">
                      <path d="M1 6.5h12M8 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        className={`works__preview${preview.on ? " works__preview--on" : ""}`}
        ref={previewRef}
        aria-hidden="true"
      >
        {preview.src && <img src={preview.src} alt="" />}
      </div>
    </section>
  );
}

export default Work;
