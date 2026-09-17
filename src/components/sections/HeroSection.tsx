import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PROFESSIONAL } from "@/content/professional";
import "./HeroSection.css";

const FLOW = ["Business input", "Data & integrations", "AI / automation", "Operational interface"];

export default function HeroSection() {
  return (
    <section id="hero" className="ffhero" aria-labelledby="hero-title">
      <div className="ff-field">
        <div className="ff-copy">
          <p className="ff-kicker">Based in {PROFESSIONAL.location}</p>
          <p className="ff-name">{PROFESSIONAL.name}</p>
          <h1 id="hero-title">{PROFESSIONAL.primaryTitle}</h1>
          <p className="ff-summary">{PROFESSIONAL.summary}</p>
          <p className="ff-current">Currently {PROFESSIONAL.currentRole.title} at {PROFESSIONAL.currentRole.company}.</p>
          <div className="ff-cta">
            <a className="ff-btn" href="#projects">View selected work <ArrowDownRight size={16} /></a>
            <a className="ff-ghost" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="ff-system" aria-label="Typical system delivery flow">
          <div className="ff-system-head"><span>System view</span><span>01—04</span></div>
          <ol>{FLOW.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
          <p>Requirements, data flow, implementation, validation, and maintainable handover.</p>
          <Link to="/about">How I work <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}
