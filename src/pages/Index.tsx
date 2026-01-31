import { Link } from "react-router-dom";
import WordLoader from "@/components/Home/WordLoader";
import ScrollIndicator from "@/components/Layout/Scrollindicator";
import Emblem from "@/components/UI/Emblem";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projectConfig";
import ProjectCard from "@/components/ProjectCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Index = () => {
  useDocumentTitle("Layth Ayache");

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        >
          <Emblem size="centered" className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex justify-center -mt-8 md:-mt-12"
        >
          <WordLoader />
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* Manifesto Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24" aria-label="Manifesto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-medium mb-8 text-foreground">
            Manifesto
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Every project should be a contribution to the world, but many ideas die
              before having the chance to shine.
            </p>
            <p>
              The ideas here are for the take. They are either completed projects awaiting
              funding, help, or reach; ongoing projects stuck on technical challenges;
              or ideas from community members who don't know how to implement them.
            </p>
            <p>
              If you see something that resonates, take it. Build on it. Make it yours.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24" aria-label="Project timeline">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-medium mb-4 text-foreground">
              Timeline
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of work across time — completed, ongoing, and emerging.
            </p>
          </motion.div>

          <div className="grid gap-8 md:gap-12 mb-16">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/completed"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Completed
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
            <Link
              to="/ongoing"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Ongoing
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
            <Link
              to="/friends"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Friends
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
