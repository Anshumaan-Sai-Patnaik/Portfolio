import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import "./!main.css";

function Navbar() {
  const [isPill, setIsPill] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const PILL_THRESHOLD = 100;
  const MOBILE_BREAKPOINT = 800;
  const SCROLL_DELTA = 2;

  const updatePill = useCallback(() => {
    const isDesktop = window.innerWidth > MOBILE_BREAKPOINT;
    const currentY = window.scrollY;
    const prevY = lastScrollY.current;
    lastScrollY.current = currentY;

    // Near the top (or on mobile): always show the full navbar.
    if (!isDesktop || currentY <= PILL_THRESHOLD) {
      setIsPill(false);
      return;
    }

    // Otherwise follow scroll direction: down → pill, up → full navbar.
    if (currentY - prevY > SCROLL_DELTA) {
      setIsPill(true);
    } else if (prevY - currentY > SCROLL_DELTA) {
      setIsPill(false);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePill();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [updatePill]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="header">
        <nav className={`nav${isPill ? " nav--pill" : ""}`}>
          <a href="#hero" className="nav__name">ASaP</a>

          <div className="nav__links">
            {navLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && <span className="nav__sep" aria-hidden="true">|</span>}
                <a href={link.href}>{link.label}</a>
              </Fragment>
            ))}
          </div>

          <button
            className={`nav__menu${menuOpen ? " nav__menu--open" : ""}`}
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span className="nav__menu-bars">
              <span></span>
              <span></span>
            </span>
            <span className="nav__menu-close">CLOSE</span>
          </button>
        </nav>
      </header>

      <div className={`overlay${menuOpen ? " overlay--open" : ""}`}>
        <nav className="overlay__nav">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="overlay__link"
              style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.08}s` : `${(navLinks.length - 1 - i) * 0.06}s` }}
              onClick={closeMenu}
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
