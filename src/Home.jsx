import { useEffect } from 'react'

import About from './about/!main'
import Contact from './contact/!main'
import Footer from './footer/!main'
import Gutter from './gutter/!main'
import Hero from './hero/!main'
import Navbar from './navbar/!main'
import SectionGuide from './sectionguide/!main'
import Work from './work/!main'

function Home() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Gutter />
      <SectionGuide />

      <Navbar />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
