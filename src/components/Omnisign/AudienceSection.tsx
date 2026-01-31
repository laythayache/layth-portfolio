import { motion } from "framer-motion";
import { Heart, BookOpen, Code, Building } from "lucide-react";

const audiences = [
  {
    icon: Heart,
    title: "Individuals",
    description: "Personal communication, video calls, and everyday accessibility",
    features: ["Mobile app", "Video call integration", "Personal subtitles"],
  },
  {
    icon: BookOpen,
    title: "Educators",
    description: "Teaching tools, curriculum support, and student engagement",
    features: ["Interactive lessons", "Progress tracking", "Classroom integration"],
  },
  {
    icon: Code,
    title: "Developers",
    description: "API access, SDKs, and integration tools for your applications",
    features: ["REST API", "JavaScript SDK", "Comprehensive docs"],
  },
  {
    icon: Building,
    title: "Organizations",
    description: "Enterprise solutions, training, and compliance support",
    features: ["Enterprise plans", "Team training", "WCAG compliance"],
  },
];

const AudienceSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-6 sm:px-12 lg:px-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Built for Everyone
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            OmniSign serves diverse communities and use cases
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {audiences.map((audience, index) => {
            const isNDARequired = audience.title === "Developers" || audience.title === "Organizations";
            return (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 border-2 border-border rounded-lg p-6 pb-8 hover:border-primary/40 transition-all"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 self-start md:self-center">
                  <audience.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-mono text-2xl font-medium text-foreground mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {audience.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {audience.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {isNDARequired && (
                    <motion.a
                      href="mailto:laythayache5@gmail.com?subject=OmniSign Enterprise Access Request (NDA Required)"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto inline-block w-full sm:w-fit px-6 py-3 bg-foreground text-background rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-lg transition-colors hover:bg-foreground/90 text-center"
                    >
                      Request Access (NDA Required)
                    </motion.a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

