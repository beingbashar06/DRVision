import { motion } from "framer-motion";
import { Eye, Activity, AlertCircle, ShieldCheck, Microscope } from "lucide-react";
const stages = [
  { name: "No DR", desc: "No visible signs of diabetic retinopathy in the retinal image.", severity: "Normal", icon: ShieldCheck },
  { name: "Mild DR", desc: "Early retinal changes, mainly characterized by microaneurysms.", severity: "Mild", icon: Eye },
  { name: "Moderate DR", desc: "More noticeable retinal abnormalities, including hemorrhages and other lesions.", severity: "Moderate", icon: Activity },
  { name: "Severe DR", desc: "Extensive retinal abnormalities that indicate advanced disease.", severity: "Severe", icon: AlertCircle },
  { name: "Proliferative DR", desc: "Advanced stage characterized by abnormal new blood vessel growth.", severity: "Critical", icon: Microscope },
];
export default function Classification() {
  return <section id="classification" className="lp-section lp-classification"><div className="lp-container">
    <motion.div className="lp-section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="lp-eyebrow"><Eye size={15} /> Understanding DR stages</span><h2>Five stages of <span>diabetic retinopathy</span></h2><p>Learn about the five severity levels represented in the DR classification system.</p></motion.div>
    <div className="lp-stage-grid">{stages.map((stage, index) => { const Icon = stage.icon; return <motion.article className={`lp-stage-card stage-${index}`} key={stage.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} whileHover={{ y: -5 }}><div className="lp-stage-head"><span>LEVEL {index}</span><i><Icon size={22} /></i></div><h3>{stage.name}</h3><p>{stage.desc}</p><div className="lp-severity"><small>Severity</small><strong>{stage.severity}</strong><div>{stages.map((_, i) => <i key={i} className={i <= index ? "active" : ""} />)}</div></div></motion.article>; })}</div>
    <div className="lp-medical-note"><AlertCircle size={18} /><p><strong>Medical disclaimer:</strong> DRVision provides preliminary screening support and educational information. Results are not a medical diagnosis. Always consult a qualified eye-care professional.</p></div>
  </div></section>;
}
