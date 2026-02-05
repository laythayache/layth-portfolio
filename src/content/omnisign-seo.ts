// ──────────────────────────────────────────────
// OmniSign structured data (JSON-LD) for SEO
// ──────────────────────────────────────────────

const BASE = "https://laythayache.com";
const PAGE = `${BASE}/projects/omnisign`;

export const omnisignJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ── WebPage ─────────────────────────────────
    {
      "@type": "WebPage",
      "@id": `${PAGE}#webpage`,
      url: PAGE,
      name: "OmniSign — AI Sign Language Translation | Lebanese Sign Language",
      description:
        "OmniSign is an AI-powered Lebanese Sign Language (LSL) translation system built at Rafik Hariri University. 50,000+ signs collected, 98% accuracy, self-funded. Partnered with SignWithNaila.",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${PAGE}#software` },
      mainEntity: { "@id": `${PAGE}#software` },
      datePublished: "2025-01-01",
      dateModified: "2026-02-05",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Explore",
            item: `${BASE}/explore`,
          },
          { "@type": "ListItem", position: 3, name: "OmniSign", item: PAGE },
        ],
      },
    },

    // ── SoftwareApplication + ResearchProject ───
    {
      "@type": ["SoftwareApplication", "ResearchProject"],
      "@id": `${PAGE}#software`,
      name: "OmniSign",
      alternateName: [
        "OmniSign LSL",
        "OmniSign Sign Language Translation",
        "OmniSign Lebanese Sign Language",
      ],
      url: PAGE,
      description:
        "AI-powered real-time sign language translation system for Lebanese Sign Language (LSL) and Arabic Sign Language. Uses computer vision, neural language modeling, and edge computing to translate gestures to text and speech. The first digital LSL dataset, with 50,000+ signs collected and 80,000+ processed. 98% accuracy. Self-funded.",
      applicationCategory: "Accessibility",
      operatingSystem: "Cross-platform",
      image: `${BASE}/omnisign-logo.png`,
      featureList: [
        "Real-time sign language gesture recognition",
        "Lebanese Sign Language (LSL) support — first of its kind",
        "American Sign Language (ASL) support",
        "Gesture-to-text translation",
        "Gesture-to-speech translation via TTS",
        "Interactive sign language learning platform",
        "Under 100ms latency with edge computing",
        "Privacy-preserving federated learning architecture",
        "WCAG-compliant accessible interface",
      ],
      keywords: [
        "Lebanese Sign Language",
        "LSL",
        "Sign Language Lebanon",
        "Arabic Sign Language",
        "sign language translation",
        "AI sign language",
        "computer vision",
        "deaf community Lebanon",
        "OmniSign",
        "accessibility",
        "real-time translation",
        "SignWithNaila",
        "Rafik Hariri University",
      ],
      inLanguage: ["en", "ar"],
      isAccessibleForFree: true,
      funder: {
        "@type": "Organization",
        name: "Self-funded by the OmniSign team",
      },
      sourceOrganization: { "@id": `${PAGE}#rhu` },
      contributor: [
        { "@id": `${PAGE}#layth-ayache` },
        { "@id": `${PAGE}#tayseer-laz` },
        { "@id": `${PAGE}#abubaker-el-khatib` },
        { "@id": `${PAGE}#noor-el-hariri` },
        { "@id": `${PAGE}#rami-kronbi` },
        { "@id": `${PAGE}#oussama-mustapha` },
      ],
      sponsor: [
        { "@id": `${PAGE}#aaramoun` },
        { "@id": `${PAGE}#sinelfil` },
        { "@id": `${PAGE}#signwithnaila` },
        { "@id": `${PAGE}#rhu` },
      ],
    },

    // ── Person: Layth Ayache ────────────────────
    {
      "@type": "Person",
      "@id": `${PAGE}#layth-ayache`,
      name: "Layth Ayache",
      url: BASE,
      image: `${BASE}/layth-ayache.jpeg`,
      jobTitle: "AI & ML Lead",
      description:
        "AI and Machine Learning Lead of OmniSign. Responsible for computer vision, model training, data pipeline, dataset cleaning and augmentation, community outreach, and event planning for the OmniSign Lebanese Sign Language translation project at Rafik Hariri University.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Computer Vision",
        "Machine Learning",
        "Lebanese Sign Language",
        "Sign Language Translation",
        "Deep Learning",
        "Data Augmentation",
      ],
      sameAs: ["https://github.com/laythayache"],
    },

    // ── Person: Tayseer Laz ─────────────────────
    {
      "@type": "Person",
      "@id": `${PAGE}#tayseer-laz`,
      name: "Tayseer Laz",
      image: `${BASE}/tayseer-laz.jpeg`,
      jobTitle: "Web & PR Lead",
      description:
        "Web and PR Lead of OmniSign. Handles website development, model integration into mobile app, data collection, community communications, and event coordination for the OmniSign Lebanese Sign Language translation project at Rafik Hariri University.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Web Development",
        "Mobile App Integration",
        "Public Relations",
        "Community Outreach",
        "Lebanese Sign Language",
      ],
    },

    // ── Person: Abu Baker Hussein El Khatib ─────
    {
      "@type": "Person",
      "@id": `${PAGE}#abubaker-el-khatib`,
      name: "Abu Baker Hussein El Khatib",
      image: `${BASE}/abubaker.jpeg`,
      jobTitle: "App Developer",
      description:
        "App Developer for OmniSign. Built the Flutter mobile and web applications, and conducted data collection at campus events and community booths for the Lebanese Sign Language translation project at Rafik Hariri University.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Flutter",
        "Mobile App Development",
        "Web App Development",
        "Lebanese Sign Language",
      ],
    },

    // ── Person: Noor El Hariri ──────────────────
    {
      "@type": "Person",
      "@id": `${PAGE}#noor-el-hariri`,
      name: "Noor El Hariri",
      image: `${BASE}/noor-el-hariri.jpeg`,
      jobTitle: "Project Coordinator",
      description:
        "Project Coordinator for OmniSign. Manages Flutter app development, academic documentation, project reports, and research coordination for the Lebanese Sign Language translation project at Rafik Hariri University.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Project Coordination",
        "Flutter",
        "Academic Research",
        "Lebanese Sign Language",
      ],
    },

    // ── Person: Rami Kronbi ─────────────────────
    {
      "@type": "Person",
      "@id": `${PAGE}#rami-kronbi`,
      name: "Rami Kronbi",
      image: `${BASE}/rami-kronbi.jpeg`,
      jobTitle: "Computer Vision Engineer",
      description:
        "Computer Vision Engineer for OmniSign. Responsible for ML engineering, computer vision pipeline development, data collection, and serves as next-phase technical lead for the Lebanese Sign Language translation project at Rafik Hariri University.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Computer Vision",
        "Machine Learning Engineering",
        "Pipeline Development",
        "Lebanese Sign Language",
      ],
    },

    // ── Person: Dr. Oussama Mustapha ────────────
    {
      "@type": "Person",
      "@id": `${PAGE}#oussama-mustapha`,
      name: "Dr. Oussama Mustapha",
      image: `${BASE}/oussama-mustapha.jpeg`,
      jobTitle: "Research Advisor",
      description:
        "Research Advisor for OmniSign at Rafik Hariri University. Provides academic guidance, research methodology oversight, and project supervision for the Lebanese Sign Language translation project.",
      affiliation: { "@id": `${PAGE}#rhu` },
      knowsAbout: [
        "Academic Research",
        "Research Methodology",
        "Computer Science",
        "Lebanese Sign Language",
      ],
    },

    // ── Rafik Hariri University ──────────────────
    {
      "@type": "EducationalOrganization",
      "@id": `${PAGE}#rhu`,
      name: "Rafik Hariri University",
      alternateName: ["RHU"],
      description:
        "Rafik Hariri University in Lebanon. The academic institution where the OmniSign Lebanese Sign Language translation project was developed.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressLocality: "Mechref, Lebanon",
      },
    },

    // ── SignWithNaila ────────────────────────────
    {
      "@type": "Organization",
      "@id": `${PAGE}#signwithnaila`,
      name: "SignWithNaila",
      description:
        "Instagram educator and leader in Lebanon's sign language community. Community partner of OmniSign for data collection and sign language education.",
      knowsAbout: [
        "Lebanese Sign Language",
        "Sign Language Education",
        "Deaf Community Lebanon",
      ],
    },

    // ── Aaramoun Orphanage Center ────────────────
    {
      "@type": "Organization",
      "@id": `${PAGE}#aaramoun`,
      name: "Aaramoun Orphanage Center",
      description:
        "Community partner of OmniSign for data collection and engagement with the deaf community in Lebanon.",
      address: { "@type": "PostalAddress", addressCountry: "LB" },
    },

    // ── Sin El Fil Church ────────────────────────
    {
      "@type": "Organization",
      "@id": `${PAGE}#sinelfil`,
      name: "Sin El Fil Church",
      description:
        "Community partner of OmniSign for data collection with deaf community members in the Sin El Fil area of Beirut, Lebanon.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressLocality: "Sin El Fil, Beirut",
      },
    },
  ],
};
