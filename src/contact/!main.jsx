import { useState, useRef, useEffect } from "react";
import useMagnetic from "../hooks/useMagnetic";
import "./!main.css";

const SUBJECTS = [
  "Project Collaboration",
  "Just Saying Hello",
];

// Public access key from web3forms.com — safe to ship in the client.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Reasonable RFC-ish format check (not existence — that can't be verified client-side).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimum meaningful message length — blocks "hi"/"test" without annoying real people.
const MIN_MESSAGE_LENGTH = 10;

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [dropOpen, setDropOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const dropRef = useRef(null);
  const submitRef = useMagnetic(0.3);

  useEffect(() => {
    function close(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    // Honeypot: bots fill hidden fields — silently pretend success.
    if (e.target.botcheck && e.target.botcheck.checked) {
      setStatus("success");
      return;
    }

    if (!EMAIL_RE.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < MIN_MESSAGE_LENGTH) {
      setStatus("error");
      setErrorMsg(`Please write at least ${MIN_MESSAGE_LENGTH} characters.`);
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setErrorMsg("Form isn't configured yet. Add your Web3Forms key.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject
            ? `Portfolio — ${form.subject}`
            : "Portfolio Enquiry",
          message: form.message,
          replyto: form.email,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and retry.");
    }
  }

  return (
    <section id="contact" className="contact">
      <p className="contact__label">Contact</p>

      <div className="contact__grid">
        <div className="contact__left" data-reveal>
          <h2 className="contact__heading">
            Got an idea? Let's make it real.
          </h2>

          <div className="contact__block">
            <a className="contact__tag" href="https://cal.com/anshumaan-sai-patnaik/brewingcuriosity" target="_blank" rel="noopener noreferrer">BOOK A CALL</a>
            <a
              className="contact__link"
              href="https://cal.com/anshumaan-sai-patnaik/brewingcuriosity"
              target="_blank"
              rel="noopener noreferrer"
            >
              cal.com/anshumaan-sai-patnaik
            </a>
          </div>

          <div className="contact__block">
            <a className="contact__tag" href="mailto:anshumaan.2k6@gmail.com">SAY HELLO</a>
            <a className="contact__link" href="mailto:anshumaan.2k6@gmail.com">
              anshumaan.2k6@gmail.com
            </a>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} data-reveal style={{ '--reveal-delay': '0.15s' }}>
          {/* Honeypot — hidden from humans, tempting to bots. */}
          <input
            type="checkbox"
            name="botcheck"
            className="contact__honeypot"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="contact__field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field contact__field--select" ref={dropRef}>
            <button
              type="button"
              className="contact__dropdown-trigger"
              onClick={() => setDropOpen((v) => !v)}
            >
              <span className={form.subject ? "contact__dropdown-value--filled" : ""}>
                {form.subject || "Subject..."}
              </span>
              <svg
                className={`contact__dropdown-arrow ${dropOpen ? "contact__dropdown-arrow--open" : ""}`}
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <ul className={`contact__dropdown-menu ${dropOpen ? "contact__dropdown-menu--open" : ""}`}>
              {SUBJECTS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className={`contact__dropdown-item ${form.subject === s ? "contact__dropdown-item--active" : ""}`}
                    onClick={() => {
                      setForm({ ...form, subject: s });
                      setDropOpen(false);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__field contact__field--textarea">
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              minLength={MIN_MESSAGE_LENGTH}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__footer">
            <button
              type="submit"
              className="contact__submit magnetic"
              ref={submitRef}
              disabled={status === "sending"}
            >
              <span className="contact__submit-arrow" aria-hidden="true">
                <svg width="12" height="10" viewBox="0 0 15 13" fill="none">
                  <path d="M1 6.5h12M8 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {status === "sending" ? "Sending…" : "Submit"}
            </button>

            <p
              className={`contact__status contact__status--${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" && "Thanks — your message is on its way."}
              {status === "error" && errorMsg}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
