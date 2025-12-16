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
      givenName: "Layth",
      familyName: "Ayache",
      alternateName: ["Layth", "Ayache"],
      jobTitle: "AI, ML, Computer Vision & NLP Engineer",
      description: siteDescription,
      url: "https://laythayache.com",
      image: "https://laythayache.com/logo/emblem.png",
      sameAs: [
        "https://github.com/laythayache",
        // "https://linkedin.com/in/laythayache",
        // "https://twitter.com/laythayache",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "AI Engineering",
        "Machine Learning",
        "ML Engineering",
        "Computer Vision",
        "CV Engineering",
        "Natural Language Processing",
        "NLP Engineering",
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
        "Healthcare Technology",
        "Government Technology",
      ],
      knowsLanguage: [
        {
          "@type": "Language",
          name: "English",
        },
        {
          "@type": "Language",
          name: "Arabic",
        },
      ],
    };

    // ProfessionalService schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Layth Ayache - AI & ML Engineering Services",
      description: siteDescription,
      url: "https://laythayache.com",
      image: "https://laythayache.com/logo/emblem.png",
      provider: {
        "@type": "Person",
        name: "Layth Ayache",
        url: "https://laythayache.com",
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      serviceType: [
        "AI Development",
        "AI Engineering",
        "Machine Learning Engineering",
        "ML Engineering",
        "Computer Vision Solutions",
        "CV Engineering",
        "NLP Development",
        "Natural Language Processing",
        "Security Engineering",
        "System Architecture",
        "Digital Infrastructure",
        "Embedded Systems Development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI & ML Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Machine Learning Development",
              description: "Custom AI and ML solutions including model development, training pipelines, and deployment.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Computer Vision Engineering",
              description: "Computer vision systems for detection, classification, tracking, and image processing.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "NLP Solutions",
              description: "Natural language processing applications including multilingual support and Arabic dialect processing.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Security & Infrastructure Engineering",
              description: "Secure, resilient system architecture for healthcare, government, and mission-critical applications.",
            },
          },
        ],
      },
    };

    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Layth Ayache",
      alternateName: "Layth Ayache - AI & ML Engineer",
      url: "https://laythayache.com",
      description: siteDescription,
      inLanguage: "en-US",
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

    // BreadcrumbList schema for better navigation
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://laythayache.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://laythayache.com/about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Projects",
          item: "https://laythayache.com/projects",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Resume",
          item: "https://laythayache.com/resume",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact",
          item: "https://laythayache.com/contact",
        },
      ],
    };

    // Add all schemas to page
    const scripts = [
      { id: "person-schema", schema: personSchema },
      { id: "professional-service-schema", schema: professionalServiceSchema },
      { id: "website-schema", schema: websiteSchema },
      { id: "breadcrumb-schema", schema: breadcrumbSchema },
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

