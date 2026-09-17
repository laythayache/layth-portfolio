import { ShieldCheck, ScanFace } from "lucide-react";

/** Original illustrative visuals are labelled; website captures show the real products. */
export default function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "lancaster-websites" || slug === "daleel") {
    const hotel = slug === "lancaster-websites";
    return <div className={`project-visual visual-site ${hotel ? "visual-lancaster" : "visual-daleel"}`}>
      <span className="visual-overline">{hotel ? "L A N C A S T E R" : "دليل / DALEEL"}</span>
      <div className="browser-frame">
        <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{hotel ? "lancasterplaza.com" : "daleel-lb.vercel.app"}</span></div>
        <img src={`/images/work/${hotel ? "lancaster" : "daleel"}.webp`} alt={hotel ? "Lancaster Plaza website with hotel video hero and property navigation" : "Daleel homepage with its Lebanese election search and exploration categories"} width="1348" height="926" loading="lazy" />
      </div>
      <span className="visual-caption">{hotel ? "Hospitality, on the web." : "Information, made accessible."}</span>
    </div>;
  }
  if (slug === "omnisign") return <div className="project-visual visual-omnisign">
    <span className="visual-overline">COMPUTER VISION × LANGUAGE</span>
    <div className="sign-study" aria-hidden="true">
      <svg viewBox="0 0 320 300" fill="none">
        <path className="hand-silhouette" d="M117 265 Q95 243 70 195 L42 144 Q38 125 53 128 L100 174 L86 79 Q85 61 99 61 Q108 61 113 79 L131 149 L126 41 Q128 22 142 25 L157 143 L166 44 Q169 26 182 35 L183 149 L204 75 Q212 59 223 69 L214 178 Q211 230 181 267 Z" />
        <path className="hand-lines" d="M147 260 L106 203 L53 139 M147 260 L126 169 L112 115 L100 75 M147 260 L150 165 L146 98 L142 39 M147 260 L172 169 L177 104 L178 45 M147 260 L197 184 L208 127 L216 80 M126 169 L150 165 L172 169 L197 184" />
        {[[147,260],[106,203],[53,139],[126,169],[112,115],[100,75],[150,165],[146,98],[142,39],[172,169],[177,104],[178,45],[197,184],[208,127],[216,80]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />)}
      </svg>
      <span className="sign-coordinate coordinate-a">LANDMARKS</span><span className="sign-coordinate coordinate-b">SEQUENCE → TEXT</span>
    </div>
    <div className="visual-product-name">Omni<span>Sign</span><span className="visual-product-dot">✳</span></div>
    <span className="visual-caption">Landmark pipeline illustration</span>
  </div>;
  if (slug === "privacy-guard") return <div className="project-visual visual-privacy">
    <span className="visual-overline"><ShieldCheck size={15} /> LOCAL PROCESSING / SENSITIVE REGIONS</span>
    <div className="privacy-scene" aria-hidden="true">
      <div className="privacy-grid" />
      <div className="privacy-person person-one"><div className="person-head" /><div className="person-body" /><div className="detection"><span>FACE / MASKED</span><div /></div></div>
      <div className="privacy-person person-two"><div className="person-head" /><div className="person-body" /><div className="detection"><span>FACE / MASKED</span><div /></div></div>
      <div className="scan-rule" />
    </div>
    <div className="privacy-output"><ScanFace size={24} /><span>Detect <b>→</b> Mask <b>→</b> Output</span><ShieldCheck size={24} /></div>
    <span className="visual-caption">Anonymization pipeline illustration</span>
  </div>;
  return null;
}
