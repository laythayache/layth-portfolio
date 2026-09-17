import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Cpu, Database, Layers3, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredWork } from "@/content/featured-work";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { getAllPosts } from "@/content/posts";
import { BRAND } from "@/content/brand";
import ProjectVisual from "./ProjectVisual";
import ContactSection from "@/components/sections/ContactSection";
import "./portfolio.css";

const capabilities = [
  { id: "ai", number: "01", title: "AI systems", icon: Cpu, text: "Computer vision, language models and retrieval systems connected to useful applications.", skills: ["Python", "TensorFlow", "OpenCV", "RAG"], steps: ["Data", "Model", "Evaluation", "Application"], evidence: "Explore OmniSign", href: "/projects/omnisign/" },
  { id: "web", number: "02", title: "Web engineering", icon: Layers3, text: "Web applications with clear interfaces, reliable APIs and a maintainable foundation.", skills: ["React", "TypeScript", "Node.js", "PostgreSQL"], steps: ["Interface", "API", "Database", "Deployment"], evidence: "Explore Lancaster", href: "/projects/lancaster-websites/" },
  { id: "automation", number: "03", title: "Automation & integrations", icon: Workflow, text: "Connected services and scheduled workflows that reduce repetitive operational work.", skills: ["REST APIs", "Python", "ETL", "Monitoring"], steps: ["Trigger", "Integrate", "Process", "Monitor"], evidence: "Explore my experience", href: "/#experience" },
  { id: "data", number: "04", title: "Data collection & pipelines", icon: Database, text: "Web scraping, information gathering and structured data pipelines for search and analysis.", skills: ["Web scraping", "Data ingestion", "SQL", "Python"], steps: ["Sources", "Collect", "Structure", "Use"], evidence: "Explore Daleel", href: "/projects/daleel/" },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="folio-kicker"><span>{number}</span>{children}</p>;
}

export function SelectedWork() {
  return <section id="projects" className="folio-work folio-wrap">
    <div className="folio-section-head"><div><SectionLabel number="01">Selected work</SectionLabel><h2>Built. Shipped.<br /><em>Still improving.</em></h2></div><p>A selection of web platforms,<br />applied AI and data projects.</p></div>
    <div className="project-exhibits">
      {featuredWork.map(work => <article className={`project-exhibit exhibit-${work.slug}`} key={work.slug}>
        <Link to={`/projects/${work.slug}/`} className="project-image-link" aria-label={`View ${work.title} project`}><ProjectVisual slug={work.slug} /><span className="project-open" aria-hidden="true"><ArrowUpRight /></span></Link>
        <div className="project-copy">
          <p className="folio-kicker"><span>{work.number}</span>{work.category}</p>
          <h3><Link to={`/projects/${work.slug}/`}>{work.title}</Link></h3>
          <p className="project-subtitle">{work.subtitle}</p>
          <p className="project-description">{work.description}</p>
          <div className="project-role"><span>My contribution</span><strong>{work.role}</strong></div>
          <ul className="folio-tags" aria-label={`${work.title} technologies and focus`}>{work.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
          <div className="project-links"><Link className="folio-text-link" to={`/projects/${work.slug}/`}>View project <ArrowRight size={17} /></Link>{work.link && <a href={work.link} target="_blank" rel="noreferrer" className="folio-text-link secondary-link">{work.linkLabel}<ArrowUpRight size={16} /></a>}</div>
        </div>
      </article>)}
    </div>
    <Link to="/projects/" className="folio-archive-link">Explore the full project archive <ArrowUpRight /></Link>
  </section>;
}

function Capabilities() {
  return <section id="services" className="folio-capabilities folio-light"><div className="folio-wrap">
    <div className="folio-section-head"><div><SectionLabel number="02">Capabilities</SectionLabel><h2>From the data<br /><em>to the interface.</em></h2></div><p>I connect AI, software and operations.<br />Explore the work behind each capability.</p></div>
    <Accordion type="single" collapsible defaultValue="ai" className="capability-list">
      {capabilities.map(item => <AccordionItem key={item.id} value={item.id} className="capability-item">
        <AccordionTrigger className="capability-trigger"><span aria-hidden="true" className="capability-number">{item.number}</span><span>{item.title}</span></AccordionTrigger>
        <AccordionContent className="capability-content"><div className="capability-detail"><div><p>{item.text}</p><ul className="folio-tags">{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><Link to={item.href} className="folio-text-link">{item.evidence}<ArrowUpRight size={16} /></Link></div><div className="capability-diagram" aria-label={`${item.title} workflow`}><item.icon size={42} strokeWidth={1} /><ol>{item.steps.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}{i < item.steps.length - 1 && <ArrowDown size={13} aria-hidden="true" />}</li>)}</ol></div></div></AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </div></section>;
}

function Experience() {
  return <section id="experience" className="folio-experience folio-wrap">
    <div className="folio-section-head"><div><SectionLabel number="03">Professional experience</SectionLabel><h2>The work<br /><em>behind the work.</em></h2></div><Link to="/about/" className="folio-text-link">Professional profile<ArrowUpRight size={17} /></Link></div>
    <Tabs defaultValue={experience[0].id} orientation="vertical" className="experience-tabs">
      <TabsList aria-label="Employers" className="experience-list">{experience.slice(0, 4).map((job, i) => <TabsTrigger key={job.id} value={job.id} className="experience-trigger"><span aria-hidden="true" className="experience-number">0{i + 1}</span><span>{job.company}<small>{job.dateStart} — {job.dateEnd}</small></span><ArrowUpRight size={19} aria-hidden="true" /></TabsTrigger>)}</TabsList>
      {experience.slice(0, 4).map(job => <TabsContent key={job.id} value={job.id} className="experience-content"><p className="folio-kicker">{job.type} / {job.location}</p><h3>{job.role}</h3><p className="experience-date">{job.dateStart} — {job.dateEnd}</p><ul className="experience-bullets">{job.bullets.slice(0, 3).map(bullet => <li key={bullet}>{bullet}</li>)}</ul><ul className="folio-tags">{job.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></TabsContent>)}
    </Tabs>
    <Link to="/about/#experience" className="folio-text-link earlier-experience">Earlier roles, education & background<ArrowRight size={17} /></Link>
  </section>;
}

function CredentialsAndWriting() {
  const posts = getAllPosts().slice(0, 2);
  return <section className="folio-notes folio-light"><div className="folio-wrap notes-grid">
    <div id="certifications"><SectionLabel number="04">Education & credentials</SectionLabel><h2>Technical<br /><em>foundations.</em></h2><Accordion type="single" collapsible className="credential-list">{certifications.slice(0, 4).map(item => <AccordionItem key={item.id} value={item.id}><AccordionTrigger><span>{item.name}<small>{item.issuer}</small></span></AccordionTrigger><AccordionContent><p>{item.details}</p><p className="credential-date">{item.date}</p></AccordionContent></AccordionItem>)}</Accordion><Link className="folio-text-link" to="/credentials/">All credentials<ArrowUpRight size={16} /></Link></div>
    <div id="blog"><SectionLabel number="05">Writing & ideas</SectionLabel><h2>Notes from<br /><em>the work.</em></h2><div className="folio-posts">{posts.map(post => <Link key={post.slug} to={`/blog/${post.slug}/`} className="folio-post"><span>{post.tags[0] ?? "Engineering"} / {post.readingTimeMinutes} min read</span><h3>{post.title}</h3><ArrowUpRight size={23} aria-hidden="true" /></Link>)}</div><Link className="folio-text-link" to="/blog/">All writing<ArrowUpRight size={16} /></Link><Link className="folio-text-link speaking-link" to="/speaking/" id="speaking">Talks & workshops<ArrowUpRight size={16} /></Link></div>
  </div></section>;
}

export default function CreativePortfolio() {
  return <div className="creative-portfolio">
    <section className="folio-hero folio-wrap" aria-labelledby="portfolio-name">
      <div className="hero-eyebrow"><span className="folio-kicker"><span className="blue-square" />{BRAND.title}</span><span className="hero-location">Beirut, Lebanon · Working across disciplines</span></div>
      <h1 id="portfolio-name" className="folio-name"><span>LAYTH</span><span>AYACHE<span className="name-period">.</span></span></h1>
      <div className="hero-orbit" aria-hidden="true"><div /><div /><div /><div /><span>AI</span></div>
      <div className="hero-bottom"><div className="hero-intro"><img src="/images/team/layth-ayache.jpeg" alt="Layth Ayache" width="80" height="80" fetchPriority="high" /><p>I design and build AI systems,<br className="desktop-break" /> automation workflows and<br className="desktop-break" /> web applications.</p></div><div className="hero-actions"><a href="#projects" className="folio-button">Explore my work<ArrowDownRight size={21} /></a><a href={`mailto:${BRAND.email}`} className="folio-text-link">Get in touch<ArrowUpRight size={17} /></a></div></div>
      <div className="hero-footnote"><span>Currently at Aachour Holding</span><span>SCROLL TO EXPLORE <ArrowDown size={12} /></span></div>
    </section>
    <SelectedWork />
    <Capabilities />
    <Experience />
    <CredentialsAndWriting />
    <ContactSection />
    <footer className="folio-footer folio-wrap"><Link to="/" className="footer-wordmark">Layth Ayache<span>✳</span></Link><div><Link to="/about/">About</Link><Link to="/faq/">FAQ</Link><a href={BRAND.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={BRAND.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><p>© {new Date().getFullYear()} Layth Ayache</p></footer>
  </div>;
}
