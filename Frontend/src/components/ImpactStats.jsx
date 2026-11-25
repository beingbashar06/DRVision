import { motion } from "framer-motion";
import { Globe, MapPin, TrendingUp, Eye, ExternalLink, Activity } from "lucide-react";
const statistics = [
  { value: "103.12M+", title: "Adults globally", description: "Estimated adults living with diabetic retinopathy worldwide in 2020.", category: "GLOBAL IMPACT", icon: Globe, source: "Global DR Study · 2021", link: "https://pubmed.ncbi.nlm.nih.gov/33940045/" },
  { value: "160.50M", title: "Projected by 2045", description: "Projected global number of adults with diabetic retinopathy by 2045.", category: "FUTURE PROJECTION", icon: TrendingUp, source: "Global DR Study · 2021", link: "https://pubmed.ncbi.nlm.nih.gov/33940045/" },
  { value: "12.5%", title: "DR prevalence in India", description: "Estimated prevalence among people with diabetes in the Indian SMART study.", category: "INDIA IMPACT", icon: MapPin, source: "SMART India Study", link: "https://pubmed.ncbi.nlm.nih.gov/36327997/" },
  { value: "3 million", title: "Vision-threatening DR", description: "Estimated people aged 40+ affected by vision-threatening DR in India.", category: "INDIA IMPACT", icon: Eye, source: "SMART India Study", link: "https://pubmed.ncbi.nlm.nih.gov/36327997/" },
];
export default function ImpactStats() {
  return <section id="impact" className="lp-section lp-impact"><div className="lp-container">
    <motion.div className="lp-section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
      <span className="lp-eyebrow"><Activity size={16} /> The global health challenge</span>
      <h2>The growing burden of <span>diabetic retinopathy</span></h2>
      <p>Diabetic retinopathy threatens the vision of millions. Early detection and timely screening are essential to reducing its impact.</p>
    </motion.div>
    <div className="lp-stats-grid">{statistics.map((item, index) => { const Icon = item.icon; return <motion.article className="lp-stat-card" key={item.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .09 }} whileHover={{ y: -6 }}>
      <div className={`lp-stat-icon stat-${index}`}><Icon size={23} /></div><span className="lp-stat-category">{item.category}</span><strong className="lp-stat-value">{item.value}</strong><h3>{item.title}</h3><p>{item.description}</p><a href={item.link} target="_blank" rel="noopener noreferrer">{item.source}<ExternalLink size={14} /></a>
    </motion.article>; })}</div>
    <motion.div className="lp-impact-callout" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div><span>WHY EARLY SCREENING MATTERS</span><h3>Earlier insight can help protect sight.</h3><p>DRVision aims to support doctors with accessible AI-assisted retinal screening and visual explanations.</p></div><a href="/screening">Explore screening <ExternalLink size={16} /></a></motion.div>
    <p className="lp-source-note">Sources: Published scientific studies. Global figures refer to 2020 estimates and 2045 projections. Indian figures are based on the SMART India population-based study. These are research estimates, not live counts.</p>
  </div></section>;
}
