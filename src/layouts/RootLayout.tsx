import Navbar from "@/components/Navbar";
import RouteTransition from "@/motion/RouteTransition";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <RouteTransition />
    </>
  );
}
