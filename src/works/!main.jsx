import "./!main.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useMagnetic from "../hooks/useMagnetic";
import { works } from "../work/data";

// Story / experience copy may mark words with *asterisks* for emphasis;
// those become serif-italic highlights, everything else stays plain text.
function renderEmphasis(text) {
  return text.split(/(\*[^*]+\*)/g).map((chunk, i) =>
    chunk.startsWith("*") && chunk.endsWith("*") ? (
      <em key={i} className="workdetail__em">{chunk.slice(1, -1)}</em>
    ) : (
      chunk
    )
  );
}

// Renders the image, falling back to a labelled placeholder until the
// file is actually dropped into public/works/<id>/.
function WorkImage({ src, alt, index }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="workdetail__placeholder">image {index}</span>;
  }

  return (
    <img
      className="workdetail__img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// A single gallery figure — used for the cover, the side-by-side row, and
// the horizontal strip. An image entry is "01.png" or { src, caption }.
function Shot({ workId, img, index, className = "", style, dataIdx, onZoom }) {
  const { src, caption } = typeof img === "string" ? { src: img } : img;
  const fullSrc = `/works/${workId}/${src}`;
  const open = onZoom ? () => onZoom({ src: fullSrc, caption, index }) : undefined;
  return (
    <figure
      className={`workdetail__shot ${className}`}
      style={style}
      data-idx={dataIdx}
      onClick={open}
      role={open ? "button" : undefined}
      tabIndex={open ? 0 : undefined}
      aria-label={open ? `Enlarge ${caption || `screenshot ${index}`}` : undefined}
      onKeyDown={open ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      } : undefined}
    >
      <WorkImage
        src={fullSrc}
        alt={caption || `Screenshot ${index}`}
        index={index}
      />
      {caption && (
        <figcaption className="workdetail__caption">
          <span className="workdetail__caption-num" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Row 2 when there are 4+ images: one horizontal scrolling row with
// "view more" arrows that slide the strip instead of wrapping to more rows.
function GalleryStrip({ workId, images, startIndex, onZoom }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Indices of images currently fully inside the visible strip — only these
  // reveal their caption on hover (edge-clipped images stay quiet).
  const [fullyVisible, setFullyVisible] = useState(() => new Set());

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // Track which strip items are fully visible inside the scroller.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        setFullyVisible((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            const idx = Number(e.target.dataset.idx);
            if (e.intersectionRatio >= 0.98) next.add(idx);
            else next.delete(idx);
          });
          return next;
        });
      },
      { root, threshold: [0, 0.5, 0.98, 1] }
    );
    root.querySelectorAll(".workdetail__shot--strip").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [images]);

  // Snap to image boundaries so an image always lands fully in view
  // (a fixed-distance scroll can leave every image straddling an edge).
  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const items = [...el.querySelectorAll(".workdetail__shot--strip")];
    if (!items.length) return;
    const cur = el.scrollLeft;
    if (dir > 0) {
      const target = items.find((it) => it.offsetLeft > cur + 2);
      el.scrollTo({ left: target ? target.offsetLeft : el.scrollWidth, behavior: "smooth" });
    } else {
      const before = items.filter((it) => it.offsetLeft < cur - 2);
      const target = before[before.length - 1];
      el.scrollTo({ left: target ? target.offsetLeft : 0, behavior: "smooth" });
    }
  };

  return (
    <div className="workdetail__strip-wrap">
      <div className="workdetail__strip" ref={trackRef} onLoadCapture={sync}>
        {images.map((img, i) => (
          <Shot
            key={typeof img === "string" ? img : img.src}
            workId={workId}
            img={img}
            index={startIndex + i}
            dataIdx={i}
            onZoom={onZoom}
            className={`workdetail__shot--strip${fullyVisible.has(i) ? "" : " is-clipped"}`}
          />
        ))}
      </div>

      {!atStart && (
        <button
          type="button"
          className="workdetail__nav workdetail__nav--prev"
          onClick={() => nudge(-1)}
          aria-label="Previous images"
        >
          <svg width="17" height="14" viewBox="0 0 17 14" fill="none" aria-hidden="true">
            <path d="M15 7H2M8 1L2 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {!atEnd && (
        <button
          type="button"
          className="workdetail__nav workdetail__nav--next"
          onClick={() => nudge(1)}
          aria-label="View more images"
        >
          <svg width="17" height="14" viewBox="0 0 17 14" fill="none" aria-hidden="true">
            <path d="M2 7h13M9 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const reportRef = useMagnetic(0.25);
  const [showViewer, setShowViewer] = useState(false);
  // The gallery image currently enlarged in the lightbox, or null.
  const [zoom, setZoom] = useState(null);

  // On narrow screens the 2-up row would wrap into extra stacked rows. Instead,
  // show those images as one horizontal strip with arrows — like the 4+ case.
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== "undefined" &&
      window.matchMedia("(max-width: 760px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const onChange = (e) => setIsNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const work = works.find((w) => w.id === slug);

  const goBack = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate("/");
  }, [navigate]);

  // Each detail route is its own page — start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Escape closes the zoomed image first, then the PDF viewer, then leaves.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (zoom) setZoom(null);
      else if (showViewer) setShowViewer(false);
      else goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, showViewer, goBack]);

  // Lock background scroll while the viewer or a zoomed image is open.
  useEffect(() => {
    if (!showViewer && !zoom) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [showViewer, zoom]);

  if (!work) {
    return (
      <div className="workdetail workdetail--missing">
        <div className="workdetail__inner">
          <p className="workdetail__meta">404</p>
          <h1 className="workdetail__title">No such work.</h1>
          <p className="workdetail__para workdetail__para--muted">
            That project doesn't exist — it may have been renamed or removed.
          </p>
          <Link to="/" className="workdetail__report">
            <span aria-hidden="true">←</span>
            Back to all work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="workdetail" aria-label={work.title}>
      <div className="workdetail__inner">
        <button
          type="button"
          className="workdetail__close workdetail__reveal"
          onClick={goBack}
          style={{ '--d': '0.05s' }}
        >
          <span className="workdetail__close-arrow" aria-hidden="true">
            <svg width="13" height="11" viewBox="0 0 15 13" fill="none">
              <path d="M14 6.5H2M7 1.5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back to all work
        </button>

        <header className="workdetail__head">
          <p className="workdetail__meta workdetail__reveal" style={{ '--d': '0.12s' }}>
            <span>{work.year}</span>
            <span className="workdetail__dot" aria-hidden="true">·</span>
            <span>{work.category}</span>
          </p>
          <h1 className="workdetail__title workdetail__reveal" style={{ '--d': '0.18s' }}>
            {work.title}
          </h1>

          {work.stack?.length > 0 && (
            <ul className="workdetail__stack">
              {work.stack.map((tech, i) => (
                <li
                  key={tech}
                  className="workdetail__chip workdetail__reveal"
                  style={{ '--d': `${0.28 + i * 0.05}s` }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="workdetail__gallery">
          {work.images.length > 0 && (
            <Shot
              workId={work.id}
              img={work.images[0]}
              index={1}
              onZoom={setZoom}
              className="workdetail__shot--cover workdetail__reveal"
              style={{ '--d': '0.34s' }}
            />
          )}

          {/* 2–3 images: side by side in one row on desktop. On narrow screens
              the 2-image case would stack into an extra row, so switch it to a
              horizontal strip with arrows instead of wrapping. */}
          {work.images.length > 1 && work.images.length <= 3 && (
            isNarrow && work.images.length === 3 ? (
              <div className="workdetail__reveal" style={{ '--d': '0.42s' }}>
                <GalleryStrip
                  workId={work.id}
                  images={work.images.slice(1)}
                  startIndex={2}
                  onZoom={setZoom}
                />
              </div>
            ) : (
              <div className="workdetail__row workdetail__reveal" style={{ '--d': '0.42s' }}>
                {work.images.slice(1).map((img, i) => (
                  <Shot
                    key={typeof img === "string" ? img : img.src}
                    workId={work.id}
                    img={img}
                    index={i + 2}
                    onZoom={setZoom}
                  />
                ))}
              </div>
            )
          )}

          {/* 4+ images: the rest become a single scrolling strip. */}
          {work.images.length > 3 && (
            <div className="workdetail__reveal" style={{ '--d': '0.42s' }}>
              <GalleryStrip
                workId={work.id}
                images={work.images.slice(1)}
                startIndex={2}
                onZoom={setZoom}
              />
            </div>
          )}
        </div>

        <div className="workdetail__content">
          <div className="workdetail__story workdetail__reveal" style={{ '--d': '0.42s' }}>
            <h2 className="workdetail__subhead">The story</h2>
            {work.body.map((para, i) => (
              <p key={i} className="workdetail__para">{renderEmphasis(para)}</p>
            ))}

            <h2 className="workdetail__subhead">My experience</h2>
            {(Array.isArray(work.experience) ? work.experience : [work.experience]).map((para, i) => (
              <p key={i} className="workdetail__para">{renderEmphasis(para)}</p>
            ))}
          </div>

          <aside className="workdetail__aside workdetail__reveal" style={{ '--d': '0.5s' }}>
            <h2 className="workdetail__subhead">Go deeper</h2>
            <p className="workdetail__para workdetail__para--muted">
              The full technical write-up — architecture, decisions, and trade-offs.
            </p>
            <div className="workdetail__actions">
              <button
                ref={reportRef}
                type="button"
                className="workdetail__report"
                onClick={() => setShowViewer(true)}
              >
                View report
              </button>
              <a className="workdetail__download" href={work.report} download>
                Download PDF
                <svg className="workdetail__btn-icon" width="13" height="14" viewBox="0 0 14 15" fill="none" aria-hidden="true">
                  <path d="M7 1.5v9M3 6.5l4 4 4-4M2 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {(work.repo || work.live) && (
                <div className="workdetail__actions-row">
                  {work.repo && (
                    <a
                      className="workdetail__source"
                      href={work.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View source
                      <svg className="workdetail__btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  {work.live && (
                    <a
                      className="workdetail__live"
                      href={work.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View live
                      <svg className="workdetail__btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {showViewer && (
        <div
          className="pdfviewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${work.title} — report`}
          onClick={(e) => { if (e.target === e.currentTarget) setShowViewer(false); }}
        >
          <div className="pdfviewer__panel">
            <div className="pdfviewer__bar">
              <span className="pdfviewer__title">{work.title} — Report</span>
              <div className="pdfviewer__bar-actions">
                <a className="pdfviewer__action" href={work.report} download>
                  Download
                  <span aria-hidden="true">↓</span>
                </a>
                <button
                  type="button"
                  className="pdfviewer__action pdfviewer__close"
                  onClick={() => setShowViewer(false)}
                >
                  Close
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
            <iframe
              className="pdfviewer__frame"
              src={`${work.report}#view=FitH`}
              title={`${work.title} report`}
            />
          </div>
        </div>
      )}

      {zoom && (
        <div
          className="imgzoom"
          role="dialog"
          aria-modal="true"
          aria-label={zoom.caption || `Screenshot ${zoom.index}`}
          onClick={(e) => { if (e.target === e.currentTarget) setZoom(null); }}
        >
          <button
            type="button"
            className="imgzoom__close"
            onClick={() => setZoom(null)}
            aria-label="Close"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <figure className="imgzoom__figure">
            <img className="imgzoom__img" src={zoom.src} alt={zoom.caption || `Screenshot ${zoom.index}`} />
            {zoom.caption && (
              <figcaption className="imgzoom__caption">
                <span className="imgzoom__caption-num" aria-hidden="true">
                  {String(zoom.index).padStart(2, "0")}
                </span>
                {zoom.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}

export default WorkDetail;
