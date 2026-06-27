import { useEffect, useRef, useState } from "react";
import "./!main.css";

// Order must match the page; each id maps to a real section element.
const SECTIONS = [
  { id: "hero", label: "Intro", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "contact", label: "Contact", index: "04" },
  { id: "footer", label: "End", index: "05" },
];

// A section becomes "active" once its top crosses this fraction of the viewport.
const ACTIVATE_AT = 0.4;

function SectionGuide() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState("down");   // sweep direction on change
  const [flash, setFlash] = useState(0);     // bumps on each change → replays sweep

  const fillRef = useRef(null);
  const activeRef = useRef(0);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const vh = window.innerHeight;

      // Continuous scroll progress → drive the rail fill via ref (no re-render).
      const docH = document.documentElement.scrollHeight - vh;
      const p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;

      // Discrete active section → the last one whose top has crossed the line.
      let next = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= vh * ACTIVATE_AT) next = i;
      }
      if (next !== activeRef.current) {
        setDir(next > activeRef.current ? "down" : "up");
        activeRef.current = next;
        setActive(next);
        setFlash((f) => f + 1);
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

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const current = SECTIONS[active];

  return (
    <>
      {/* On-screen transition — a hairline + glow node sweeps across on change. */}
      <div className="sxn-flash" aria-hidden="true">
        {flash > 0 && (
          <>
            <span key={`l-${flash}`} className={`sxn-flash__line sxn-flash__line--${dir}`} />
            <span key={`n-${flash}`} className={`sxn-flash__node sxn-flash__node--${dir}`} />
          </>
        )}
      </div>

      {/* Persistent interactive rail. */}
      <aside className="sxn-rail" aria-label="Section navigation">
        <ul className="sxn-rail__nodes">
          <span ref={fillRef} className="sxn-rail__fill" aria-hidden="true" />
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`sxn-node${i === active ? " sxn-node--active" : ""}`}
                onClick={() => go(s.id)}
                aria-current={i === active ? "true" : undefined}
                aria-label={`Go to ${s.label}`}
              >
                <span className="sxn-node__dot" aria-hidden="true" />
                <span className="sxn-node__label">
                  <span className="sxn-node__index">{s.index}</span>
                  {s.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Bottom-left ticker — the label rolls up whenever the section changes. */}
      <div className="sxn-tag" aria-hidden="true">
        <span className="sxn-tag__num">{current.index}</span>
        <span className="sxn-tag__slash">/</span>
        <span className="sxn-tag__roll">
          <span key={active} className="sxn-tag__word">{current.label}</span>
        </span>
      </div>
    </>
  );
}

export default SectionGuide;
