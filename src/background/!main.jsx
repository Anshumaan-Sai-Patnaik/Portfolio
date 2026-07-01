import { useEffect, useRef } from "react";
import "./!main.css";

// Fixed ambient backdrop: warm aura gradients + dot grid + film grain.
// Each [data-rate] layer parallaxes at its own rate as the page scrolls,
// eased through a lerp so the drift feels weighted rather than glued.
function Background() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      rootRef.current?.querySelectorAll("[data-rate]") ?? []
    ).map((el) => ({ el, rate: parseFloat(el.dataset.rate) }));
    if (!layers.length) return;

    let target = window.scrollY;
    let current = target;
    let frame;

    const render = () => {
      current += (target - current) * 0.07;
      for (const { el, rate } of layers) {
        el.style.transform = `translate3d(0, ${(current * rate).toFixed(2)}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };
    const onScroll = () => {
      target = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="bg" ref={rootRef} aria-hidden="true">
      <div className="bg__aura bg__aura--sand" data-rate="-0.05"><span /></div>
      <div className="bg__aura bg__aura--clay" data-rate="0.09"><span /></div>
      <div className="bg__aura bg__aura--haze" data-rate="-0.13"><span /></div>
      <div className="bg__grid" data-rate="-0.025" />
      <div className="bg__grain" />
    </div>
  );
}

export default Background;
