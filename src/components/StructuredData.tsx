"use client";

import { useEffect } from "react";

const siteDescription = "AI, ML, Computer Vision, and NLP engineer specializing in security and digital infrastructure. Building systems that fail gracefully under pressure for government, healthcare, and public services.";

export default function StructuredData() {
  useEffect(() => {
    // Person schema for better search visibility
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Layth Ayache",
      alternateName: ["Layth", "Ayache"],
      jobTitle: "AI, ML, Computer Vision & NLP Engineer",
      description: "AI, ML, Computer Vision, and NLP engineer specializing in security and digital infrastructure. Building systems that fail gracefully under pressure for government, healthcare, and public services.",
      url: "https://laythayache.com",
      sameAs: [
        // Add your social profiles here
        // "https://github.com/laythayache",
        // "https://linkedin.com/in/laythayache",
        // "https://twitter.com/laythayache",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Deep Learning",
        "Neural Networks",
        "Security Engineering",
        "Digital Infrastructure",
        "System Architecture",
        "Embedded Systems",
        "Networking",
        "Deployment",
        "HIPAA Compliance",
        "Threat Modeling",
        "Resilient Systems",
      ],
      alumniOf: {
        "@type": "Organization",
        name: "", // Add your university/org if desired
      },
    };

    // ProfessionalService schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Layth Ayache - AI & ML Engineering Services",
      description: siteDescription,
      provider: {
        "@type": "Person",
        name: "Layth Ayache",
      },
      areaServed: "Worldwide",
      serviceType: [
        "AI Development",
        "Machine Learning Engineering",
        "Computer Vision Solutions",
        "NLP Development",
        "Security Engineering",
        "System Architecture",
        "Digital Infrastructure",
      ],
    };

    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Layth Ayache",
      url: "https://laythayache.com",
      description: siteDescription,
      author: {
        "@type": "Person",
        name: "Layth Ayache",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://laythayache.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };

    // Add all schemas to page
    const scripts = [
      { id: "person-schema", schema: personSchema },
      { id: "professional-service-schema", schema: professionalServiceSchema },
      { id: "website-schema", schema: websiteSchema },
    ];

    scripts.forEach(({ id, schema }) => {
      // Remove existing if present
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }

      // Add new script
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}

