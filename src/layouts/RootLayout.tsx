import Navbar from "@/components/Navbar";
import RouteTransition from "@/motion/RouteTransition";

export default function RootLayout() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <RouteTransition />
      </main>
    </>
  );
}
