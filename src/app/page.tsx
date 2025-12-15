import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import MethodFlow from "@/components/MethodFlow";

export const metadata = {
  title: "Systems Failure Analysis | AI, Security, Digital Infrastructure",
  description: "I study why systems fail under pressure. AI, security, and digital infrastructure — focused on government, healthcare, and public services in constrained environments.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <MethodFlow />
    </>
  );
}
