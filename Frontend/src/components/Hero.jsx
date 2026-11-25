import { motion } from "framer-motion";
import { Activity, ArrowRight, BrainCircuit, ScanEye, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import retinaFundus from "../assets/retina-fundus.png";

const orbitDots = Array.from({ length: 8 }, (_, i) => i);

export default function Hero() {
  return (
    <section id="home" className="lp-hero">
      <div className="lp-hero-grid" aria-hidden="true" />
      <div className="lp-hero-glow lp-hero-glow-one" />
      <div className="lp-hero-glow lp-hero-glow-two" />

      <div className="lp-container lp-hero-layout">
        <motion.div
          className="lp-hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-eyebrow lp-hero-eyebrow">
            <span className="lp-eyebrow-icon"><Activity size={17} /></span>
            <span>AI-powered retinal screening</span>
            <i />
            <small>Preliminary support</small>
          </div>

          <h1>See beyond.<br /><span>Detect early.</span><br />Protect <em>vision.</em></h1>

          <p className="lp-hero-description">
            Bringing explainable AI and retinal image analysis together to support doctors and medical learners in understanding diabetic retinopathy — one image at a time.
          </p>

          <div className="lp-hero-actions">
            <Link to="/screening" className="lp-button lp-button-primary">
              Start free screening <ArrowRight size={19} />
            </Link>
            <Link to="/login" className="lp-button lp-button-secondary">Login to portal</Link>
          </div>

          <div className="lp-trust-row">
            <span><ShieldCheck /> Accessible screening</span>
            <span><ScanEye /> Explainable AI</span>
            <span><BrainCircuit /> 5-stage assessment</span>
          </div>

          <div className="lp-hero-note"><span /> AI-assisted screening support. Not a medical diagnosis.</div>
        </motion.div>

        <motion.div
          className="lp-hero-visual"
          initial={{ opacity: 0, scale: 0.88, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-visual-aura" />

          <div className="lp-orbit lp-orbit-outer">
            <div className="lp-orbit-track" />
            {orbitDots.map((dot) => <i key={dot} className={`lp-orbit-dot dot-${dot}`} />)}
          </div>

          <div className="lp-retina-core">
            <img
              className="lp-retina-photo"
              src={retinaFundus}
              alt="Retinal fundus showing the optic disc and retinal blood vessels"
            />
            <div className="lp-retina-ring ring-one" />
            <div className="lp-retina-ring ring-two" />
            <div className="lp-retina-ring ring-three" />
            <motion.div
              className="lp-retina-pulse"
              animate={{ scale: [1, 1.035, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="lp-core-caption"><i /> Live analysis visual</span>
          </div>

          <motion.div
            className="lp-float-card lp-card-model"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="lp-card-icon"><BrainCircuit /></span>
            <div><small>AI framework</small><strong>ResNet50</strong><p>Deep learning model</p></div>
          </motion.div>

          <motion.div
            className="lp-float-card lp-card-stages"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="lp-card-icon blue"><ScanEye /></span>
            <div><small>Severity grading</small><strong>5 DR stages</strong><p>From No DR to Proliferative</p></div>
          </motion.div>

          <motion.div
            className="lp-float-chip"
            animate={{ rotate: [-3, 3, -3], y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Sparkles size={15} /> Explainable screening
          </motion.div>

          <div className="lp-visual-foot">
            <span>Image analysis</span><b>•</b><span>Model inference</span><b>•</b><span>Clinical review</span>
          </div>
        </motion.div>

        <div className="lp-hero-bottomline"><span>01 / 04</span><i /><span>Intelligence for eye care</span></div>
      </div>
    </section>
  );
}
