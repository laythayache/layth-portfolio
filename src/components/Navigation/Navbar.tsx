import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Emblem from "@/components/UI/Emblem";
import { NavLink } from "@/components/NavLink";

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  return (
    <motion.nav
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`fixed top-0 left-0 right-0 z-50 navbar-glass transition-all duration-300 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ height: "var(--navbar-height, 72px)" }}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo/Emblem */}
        <Link to="/" className="flex items-center">
          <Emblem size="navbar" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/completed"
            className="nav-link"
            activeClassName="active"
          >
            Completed
          </NavLink>
          <NavLink
            to="/ongoing"
            className="nav-link"
            activeClassName="active"
          >
            Ongoing
          </NavLink>
          <NavLink
            to="/friends"
            className="nav-link"
            activeClassName="active"
          >
            Friends
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

