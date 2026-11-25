import { motion } from "framer-motion";
import { Upload, ScanEye, BrainCircuit, FileCheck, ArrowRight, Sparkles } from "lucide-react";
const steps = [
  { icon: Upload, title: "Upload retinal image", description: "Choose a retinal fundus image from your device to begin screening.", tag: "Simple and accessible" },
  { icon: ScanEye, title: "Image processing", description: "The image is prepared using preprocessing techniques for model analysis.", tag: "OpenCV + CLAHE" },
  { icon: BrainCircuit, title: "AI-powered analysis", description: "The ResNet50 model evaluates the retinal image and estimates the DR severity stage.", tag: "ResNet50 model" },
  { icon: FileCheck, title: "Review your results", description: "Explore the predicted stage, confidence score, and Grad-CAM explanation when available.", tag: "Explainable AI" },
];
export default function HowItWorks() { return <section id="how-it-works" className="lp-section lp-how"><div className="lp-container">
  <motion.div className="lp-section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="lp-eyebrow"><Sparkles size={15} /> Simple. Smart. Accessible.</span><h2>How <span>DRVision</span> works</h2><p>From image upload to AI-assisted screening results, the process is designed to be clear and straightforward.</p></motion.div>
  <div className="lp-steps-grid">{steps.map((step, index) => { const Icon = step.icon; return <motion.article className="lp-step-card" key={step.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}><div className="lp-step-head"><span>0{index + 1}</span><i><Icon size={24} /></i></div><h3>{step.title}</h3><p>{step.description}</p><small>{step.tag}</small>{index < 3 && <b className="lp-step-arrow"><ArrowRight size={17} /></b>}</motion.article>; })}</div>
  <p className="lp-how-foot">Advanced image analysis. A simple screening experience.</p>
</div></section>; }
