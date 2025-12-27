import { useEffect } from "react";
import { Link } from "react-router-dom";
import WordLoader from "@/components/Home/WordLoader";
import ScrollIndicator from "@/components/Layout/Scrollindicator";
import Emblem from "@/components/UI/Emblem";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import { projects, getCompletedProjects, getOngoingProjects } from "@/lib/projectConfig";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Layth Ayache — Public Learning";
  }, []);

  return (
    <>
      {/* Hero Section - Manifesto State */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Centered Emblem - Large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-1 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        >
          <Emblem size="centered" className="w-full h-full" />
        </motion.div>

        {/* Word Loader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex justify-center"
        >
          <WordLoader />
        </motion.div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Manifesto Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
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
              This is not a portfolio. This is a timeline.
            </p>
            <p>
              Every project here exists in relation to time — when it was conceived, 
              how long it took to break, and what emerged from the fragments.
            </p>
            <p>
              Process is the product. Failure is data. 
              The only constant is forward motion.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
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

          {/* Featured Projects Grid */}
          <div className="grid gap-8 md:gap-12 mb-16">
            {projects.slice(0, 3).map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block p-8 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {project.status === "ongoing" && (
                        <Circle size={8} className="text-accent fill-accent animate-pulse" />
                      )}
                      <span className="font-mono text-sm text-muted-foreground">
                        {project.year}
                      </span>
                      <span className="text-border">•</span>
                      <span className="font-mono text-sm capitalize text-muted-foreground">
                        {project.status}
                      </span>
                    </div>
                    <motion.div
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                  <h3 className="font-mono text-2xl md:text-3xl font-medium mb-3 text-foreground group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Quick Links */}
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

      {/* Timeline Navigation Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Navigate the timeline
            </p>
          </motion.div>

          {/* Timeline Visualization */}
          <div className="relative">
            {/* Timeline Line with gradient */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] transform -translate-x-1/2 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
              <div className="absolute inset-0 bg-border" />
            </div>

            {/* Timeline Items */}
            <div className="space-y-20 md:space-y-32">
              {/* Past/Completed Section - Right side */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative md:flex md:items-center"
              >
                {/* Timeline dot - positioned on the line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-border border-2 border-background group-hover:bg-accent transition-all duration-300"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>
                <Link
                  to="/completed"
                  className="group block md:ml-auto md:w-[45%] md:pr-8"
                >
                  <div className="md:text-right">
                    <div className="flex items-center gap-4 mb-4 md:justify-end">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Past
                      </span>
                    </div>
                    <h3 className="font-mono text-3xl md:text-4xl font-medium mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                      Completed
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      Projects that reached resolution. Each one a lesson encoded in time.
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-border rounded-full text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-all duration-300 md:ml-auto">
                      <span className="font-mono text-xs uppercase tracking-widest">Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    {getCompletedProjects().length > 0 && (
                      <p className="mt-4 font-mono text-xs text-muted-foreground/60 md:text-right">
                        {getCompletedProjects().length} {getCompletedProjects().length === 1 ? 'project' : 'projects'}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>

              {/* Present/Current Section - Centered */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative md:flex md:items-center md:justify-center"
              >
                {/* Timeline dot - positioned on the line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-accent"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="text-center md:max-w-lg md:mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      Present
                    </span>
                  </div>
                  <h3 className="font-mono text-3xl md:text-4xl font-medium mb-3 text-foreground">
                    Now
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    The moment between conception and completion. Where process lives.
                  </p>
                </div>
              </motion.div>

              {/* Future/Ongoing Section - Left side */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative md:flex md:items-center"
              >
                {/* Timeline dot - positioned on the line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-border border-2 border-background group-hover:bg-accent transition-all duration-300"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>
                <Link
                  to="/ongoing"
                  className="group block md:mr-auto md:w-[45%] md:pl-8"
                >
                  <div className="md:text-left">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Future
                      </span>
                    </div>
                    <h3 className="font-mono text-3xl md:text-4xl font-medium mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                      Ongoing
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      Works in progress. Ideas taking shape. The future being written.
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-border rounded-full text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-all duration-300">
                      <span className="font-mono text-xs uppercase tracking-widest">Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    {getOngoingProjects().length > 0 && (
                      <p className="mt-4 font-mono text-xs text-muted-foreground/60">
                        {getOngoingProjects().length} {getOngoingProjects().length === 1 ? 'project' : 'projects'} active
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>

              {/* Friends/Collaboration Section - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative md:flex md:items-center md:justify-center"
              >
                {/* Timeline dot - positioned on the line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-border border-2 border-background group-hover:bg-accent transition-all duration-300"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>
                <Link
                  to="/friends"
                  className="group block text-center md:max-w-lg md:mx-auto"
                >
                  <div>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Network
                      </span>
                    </div>
                    <h3 className="font-mono text-3xl md:text-4xl font-medium mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                      Friends
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      The incubator. Partners in building, thinking, and breaking through.
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-border rounded-full text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-all duration-300">
                      <span className="font-mono text-xs uppercase tracking-widest">Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
