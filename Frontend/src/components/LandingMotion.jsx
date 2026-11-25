import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function LandingMotion() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const root = document.querySelector(".landing-page");
    if (!root || reduceMotion) return undefined;

    root.classList.add("lp-motion-enabled");
    const targets = root.querySelectorAll(
      ".lp-section-heading, .lp-stat-card, .lp-impact-callout, .lp-feature-card, .lp-step-card, .lp-stage-card, .lp-about-grid, .lp-audience-card"
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("lp-motion-visible"));
      return () => root.classList.remove("lp-motion-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lp-motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
    );

    targets.forEach((element, index) => {
      element.classList.add("lp-motion-reveal");
      element.style.setProperty("--lp-motion-delay", `${(index % 4) * 65}ms`);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("lp-motion-enabled");
      targets.forEach((element) => {
        element.classList.remove("lp-motion-reveal", "lp-motion-visible");
        element.style.removeProperty("--lp-motion-delay");
      });
    };
  }, [reduceMotion]);

  return (
    <motion.div
      className="lp-scroll-progress"
      style={{ scaleX: reduceMotion ? 0 : progress }}
      aria-hidden="true"
    />
  );
}
