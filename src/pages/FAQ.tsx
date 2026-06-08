import SEO from "@/components/SEO";
import FAQSection from "@/components/sections/FAQSection";
import { faqPageJsonLd } from "@/content/siteSeo";
import { BRAND } from "@/content/brand";

/** Standalone FAQ route. The FAQ used to live on the homepage; it now lives
 *  here (kept indexable for SEO) so the homepage stays short and proof-first. */
export default function FAQ() {
  return (
    <>
      <SEO
        title={`FAQ | ${BRAND.name}`}
        description="Short answers about consulting, AI systems, and collaboration with Layth Ayache."
        canonical="https://laythayache.com/faq"
        jsonLd={faqPageJsonLd()}
      />
      <FAQSection />
    </>
  );
}
