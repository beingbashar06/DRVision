import { motion } from "framer-motion";
import { BrainCircuit, ScanEye, ChartNoAxesCombined, ShieldCheck, History, GraduationCap } from "lucide-react";
const features = [
  { icon: BrainCircuit, title: "AI-powered detection", description: "A ResNet50 deep learning model to identify and classify diabetic retinopathy from retinal images." },
  { icon: ScanEye, title: "Five-stage classification", description: "Explore five severity levels, from No DR to Proliferative DR, through image analysis." },
  { icon: ChartNoAxesCombined, title: "Visual AI explanation", description: "Understand model predictions through Grad-CAM visualizations of important retinal regions." },
  { icon: ShieldCheck, title: "Accessible screening", description: "Start a preliminary retinal screening without creating an account." },
  { icon: History, title: "Patient records", description: "Registered users can organize patient information and review previous screening records." },
  { icon: GraduationCap, title: "Educational support", description: "Help medical students learn about diabetic retinopathy and its different severity stages." },
];
export default function Features() { return <section id="features" className="lp-section lp-features"><div className="lp-container">
  <motion.div className="lp-section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="lp-eyebrow">Why DRVision?</span><h2>Smarter screening. <span>Better insights.</span></h2><p>AI-powered retinal analysis, explainable results, and accessible screening — brought together in one platform.</p></motion.div>
  <div className="lp-feature-grid">{features.map((feature, index) => { const Icon = feature.icon; return <motion.article className="lp-feature-card" key={feature.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07, duration: .5 }} whileHover={{ y: -6 }}><div className="lp-feature-top"><span className="lp-feature-icon"><Icon size={24} /></span><span className="lp-feature-number">0{index + 1}</span></div><h3>{feature.title}</h3><p>{feature.description}</p><i /></motion.article>; })}</div>
</div></section>; }
