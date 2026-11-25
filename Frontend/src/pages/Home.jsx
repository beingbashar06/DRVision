import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ImpactStats from "../components/ImpactStats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Classification from "../components/Classification";
import About from "../components/About";
import Footer from "../components/Footer";
import LandingMotion from "../components/LandingMotion";
import "../landing.css";
import "../LandingMotion.css";

const tickerItems = [
  "AI-assisted retinal screening",
  "Explainable insights",
  "ResNet50 deep learning",
  "Doctor-focused workflow",
  "Retinal image analysis",
];

function MotionTicker() {
  return (
    <div className="lp-motion-ticker" aria-label="DRVision platform capabilities">
      <div className="lp-motion-ticker-track">
        {[0, 1].map((copy) => (
          <div className="lp-motion-ticker-group" key={copy} aria-hidden={copy === 1}>
            {tickerItems.map((item) => (
              <span key={`${copy}-${item}`}>{item}</span>
            ))}
            <b>✳</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="landing-page">
      <LandingMotion />
      <Navbar />
      <main>
        <Hero />
        <MotionTicker />
        <ImpactStats />
        <Features />
        <HowItWorks />
        <Classification />
        <About />
      </main>
      <Footer />
    </div>
  );
}
