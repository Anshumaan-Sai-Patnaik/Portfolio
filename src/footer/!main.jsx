import "./!main.css";

function Footer() {
  const links = [
    { label: "GITHUB", href: "https://github.com/Anshumaan-Sai-Patnaik/", external: true },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/anshumaan-sai-patnaik/", external: true },
    { label: "MEDIUM", href: "https://medium.com/@Anshumaan-Sai-Patnaik", external: true },
    { label: "EMAIL", href: "mailto:anshumaan.2k6@gmail.com" },
  ];

  return (
    <footer id="footer" className="footer">
      <div className="footer__top">
        <h2 className="footer__statement" data-reveal>Built with intent</h2>

        <div className="footer__meta" data-reveal style={{ '--reveal-delay': '0.12s' }}>
          <ul className="footer__links">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__divider" data-reveal style={{ '--reveal-delay': '0.2s' }} />

      <div className="footer__bottom">
        <p className="footer__copy" data-reveal style={{ '--reveal-delay': '0.3s' }}>2026 © Anshumaan Sai Patnaik. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
