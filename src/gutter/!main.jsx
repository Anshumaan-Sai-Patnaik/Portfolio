import { useEffect, useRef } from "react";
import "./!main.css";

const TEXT =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat";

const BASE_SPEED = 0.3;
const BOOST_SPEED = 2.5;
const DECAY = 0.04;

function Gutter() {
  const gutterRef = useRef(null);
  const trackRef = useRef(null);
  const glowRef = useRef(null);
  const offset = useRef(0);
  const speed = useRef(BASE_SPEED);
  const half = useRef(0);

  useEffect(() => {
    const gutter = gutterRef.current;
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!gutter || !track) return;

    let frameId;

    const measure = () => {
      half.current = track.scrollHeight / 2;
    };
    measure();

    const animate = () => {
      speed.current += (BASE_SPEED - speed.current) * DECAY;
      offset.current += speed.current;
      if (half.current > 0 && offset.current >= half.current) {
        offset.current -= half.current;
      }
      const transform = `translateY(-${offset.current}px)`;
      track.style.transform = transform;
      if (glow) glow.style.transform = transform;

      frameId = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      speed.current = BOOST_SPEED;
    };

    // Cursor spotlight: feed pointer position to the glow layer's mask.
    const onPointerMove = (e) => {
      const rect = gutter.getBoundingClientRect();
      gutter.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      gutter.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => gutter.classList.add("gutter--lit");
    const onLeave = () => gutter.classList.remove("gutter--lit");

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    gutter.addEventListener("pointermove", onPointerMove);
    gutter.addEventListener("pointerenter", onEnter);
    gutter.addEventListener("pointerleave", onLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      gutter.removeEventListener("pointermove", onPointerMove);
      gutter.removeEventListener("pointerenter", onEnter);
      gutter.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="gutter" ref={gutterRef} aria-hidden="true">
      <div className="gutter__track" ref={trackRef}>
        <span>{TEXT}</span>
        <span>{TEXT}</span>
      </div>

      {/* Stationary spotlight mask; the bright text scrolls through it so the
          lit spot stays under the cursor instead of riding up with the text. */}
      <div className="gutter__glow">
        <div className="gutter__track gutter__track--glow" ref={glowRef}>
          <span>{TEXT}</span>
          <span>{TEXT}</span>
        </div>
      </div>
    </div>
  );
}

export default Gutter;
