import "./!main.css";

function About() {
  return (
    <section id="about" className="about">
      <p className="about__label">About</p>

      <div className="about__content">
        <div className="about__text" data-reveal>
          <h2 className="about__heading">And, I ain't AI</h2>
          <p className="about__bio">
            I fell for the excuses the universe gives, disguised as equations in its happenings, and perhaps that made <em>Physics</em> my first love. Life's surprising asymmetries, however, nudged my career toward Computers instead. And here I am now, an undergraduate pursuing Data Science and currently elbow-deep in Full Stack Web Development.
          </p>
          <p className="about__bio">
            Having recently been kicked out of calling myself a teen, I remain much the same&mdash;a stubbornly curious chap spending my days learning to dance with the chaos that curiosity welcomes rather than tame it. That pursuit has also always spilled into <em>poetry, art, and music</em>&mdash;equally native tongues through which I explore ideas that seem to live just beyond the reach of Physics' equations, where mathematics grows silent and metaphor takes over.
          </p>
        </div>

        <div className="about__portrait" data-reveal style={{ '--reveal-delay': '0.15s' }}>
          <div className="about__frame">
            <img src="/about/profile.png" alt="Anshumaan Sai Patnaik" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
