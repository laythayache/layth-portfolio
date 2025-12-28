import TranslationFlow from "./TranslationFlow";
import SignLanguageAlphabet from "./SignLanguageAlphabet";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <TranslationFlow />
        <SignLanguageAlphabet />
      </div>
    </section>
  );
};

export default DemoSection;

