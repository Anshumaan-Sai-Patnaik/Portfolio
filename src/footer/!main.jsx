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
        <h2 className="footer__statement">Built with intent</h2>

        <div className="footer__meta">
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

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__copy">2026 © Anshumaan Sai Patnaik. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
