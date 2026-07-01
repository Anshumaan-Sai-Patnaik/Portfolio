import { useEffect, useRef } from "react";
import "./!main.css";

const EASING = 0.15;            // 0 = no follow, 1 = instant snap
const HOVER_SELECTOR = "a, button, [data-cursor-hover]";

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run the custom cursor on devices with a real mouse.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let renderedX = targetX;
    let renderedY = targetY;
    let visible = false;
    let scrollFrame = null;
    let frameId;

    const render = () => {
      renderedX += (targetX - renderedX) * EASING;
      renderedY += (targetY - renderedY) * EASING;
      cursor.style.left = `${renderedX}px`;
      cursor.style.top = `${renderedY}px`;
      frameId = requestAnimationFrame(render);
    };

    // Grow the cursor when the given element (or an ancestor) is interactive.
    const setHover = (el) => {
      const interactive = el?.closest?.(HOVER_SELECTOR);
      cursor.classList.toggle("cursor--hover", !!interactive);
    };

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;
      cursor.style.opacity = "1";
    };

    // Delegation: grow over any interactive element, now or added later.
    const onMouseOver = (e) => setHover(e.target);

    const onMouseLeave = () => {
      visible = false;
      cursor.style.opacity = "0";
    };

    // Scrolling slides the page under a stationary pointer, so the element
    // beneath the cursor changes without firing any mouse event. Re-detect
    // what's under the cursor and refresh the hover state to match.
    const onScroll = () => {
      if (!visible || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        setHover(document.elementFromPoint(targetX, targetY));
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />;
}

export default Cursor;
