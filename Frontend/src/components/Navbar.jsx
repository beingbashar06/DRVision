import { Activity, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [{ name: "Home", href: "#home" }, { name: "Features", href: "#features" }, { name: "How it works", href: "#how-it-works" }, { name: "About", href: "#about" }];
  const close = () => setMenuOpen(false);
  return <motion.nav className="lp-navbar" initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55, ease: "easeOut" }}>
    <div className="lp-nav-inner"><Link to="/" className="lp-brand" onClick={close}><i><Activity size={24} /></i><span>DR<span>Vision</span></span></Link>
      <div className="lp-nav-links">{navLinks.map(link => <a key={link.name} href={link.href}>{link.name}</a>)}</div>
      <div className="lp-nav-actions"><Link to="/login" className="lp-login-link">Login</Link><Link to="/screening" className="lp-nav-cta">Start screening <ArrowRight size={16} /></Link></div>
      <button className="lp-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{menuOpen && <motion.div className="lp-mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }}>{navLinks.map(link => <a key={link.name} href={link.href} onClick={close}>{link.name}</a>)}<Link to="/login" onClick={close}>Login</Link><Link to="/screening" onClick={close} className="lp-mobile-cta">Start screening <ArrowRight size={16} /></Link></motion.div>}</AnimatePresence>
  </motion.nav>;
}
