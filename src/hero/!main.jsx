import "./!main.css";

const TITLE_WORDS = ["ANSHUMAAN", "SAI", "PATNAIK"];

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">
          {TITLE_WORDS.map((word, i) => (
            <span className="hero__word" key={word}>
              <span
                className="hero__word-inner"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__desc">
          Full-Stack Web Developer crafting scalable, high-performance web applications with intuitive user experiences and reliable backend architecture.
        </p>
      </div>
    </section>
  );
}

export default Hero;
