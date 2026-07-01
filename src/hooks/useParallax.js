import { useEffect, useRef } from "react";

// Slides the element vertically as it travels through the viewport:
// `strength` px below centre when it enters, `strength` px above as it
// leaves. Attach the ref to a wrapper that owns no other transform.
export default function useParallax(strength = 40) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = null;

    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (entering at the bottom) .. 0 (centred) .. 1 (leaving at the top)
      const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      el.style.transform = `translate3d(0, ${(-p * strength).toFixed(2)}px, 0)`;
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
  }, [strength]);

  return ref;
}
